// Contact form inbox — Turso (LibSQL). Create the table with turso.sql,
// then set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in your Vercel project env.
import { createClient } from "@libsql/client";

// Lazy singleton — avoids crashing at cold start when env vars are missing.
let _db;
function getDb() {
  if (!_db) {
    _db = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return _db;
}

// Very light in-memory rate limit per IP (resets per lambda instance).
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;

function limited(ip) {
  const now = Date.now();
  const entry = hits.get(ip) || [];
  const recent = entry.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;

export default async function handler(req, res) {
  // CORS: same-origin only (also allows localhost for dev).
  const origin = req.headers.origin || "";
  const host = (req.headers["x-forwarded-host"] || req.headers.host || "").split(":")[0];
  const originHost = origin ? (new URL(origin).host || "").split(":")[0] : "";
  const allowed = !origin || originHost === host || /(^|\.)localhost$/.test(originHost);
  if (!allowed) return res.status(403).json({ ok: false, error: "Forbidden" });
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many messages. Try again later." });
  }

  const body = typeof req.body === "string" ? safeJson(req.body) : req.body || {};
  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const message = clean(body.message, 5000);

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Name, email and message are required." });
  }
  if (!emailOk(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email." });
  }

  try {
    if (!process.env.TURSO_DATABASE_URL) throw new Error("TURSO_DATABASE_URL is not set");
    await getDb().execute({
      sql: "insert into contact_messages (name, email, message) values (?, ?, ?)",
      args: [name, email, message],
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Turso insert failed:", err);
    return res.status(500).json({ ok: false, error: "Could not save your message. Please email me directly." });
  }
}

function safeJson(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
