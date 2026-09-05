// Original template JS — motion system inspired by modern portfolios, not copied.
const ICONS = {
  search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  network: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>',
  bot: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="15" y2="15"/><line x1="16" x2="16" y1="15" y2="15"/></svg>',
  gamepad: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>',
  timer: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>',
};

const PROJECTS = [
  { title: "Sondhanai — Campus Lost & Found", category: "Web", icon: "search", desc: "Report, browse & search lost/found items across campus. Champion — Intra-University Hackathon 2026.", tech: ["Web App", "Hackathon Winner"], live: "#", github: "https://github.com/monjur0x/sondhanai" },
  { title: "engineering-team-aiagent", category: "AI", icon: "network", desc: "Multi-agent orchestration exploring automated task workflows with Python + LangGraph.", tech: ["Python", "LangGraph"], live: "#", github: "https://github.com/monjur0x/engineering-team-aiagent" },
  { title: "langgraph-agents", category: "AI", icon: "bot", desc: "Agentic experiments: roles, tools and handoffs for automated workflows.", tech: ["Python", "LangGraph", "CrewAI"], live: "#", github: "https://github.com/monjur0x/langgraph-agents" },
  { title: "Flappy Bird (Python)", category: "Game", icon: "gamepad", desc: "Classic Flappy Bird recreation in Python — game loop, physics and UI logic.", tech: ["Python", "Game"], live: "#", github: "https://github.com/monjur0x/flappy-bird" },
  { title: "Countdown App (TypeScript)", category: "Game", icon: "timer", desc: "Countdown timer utility in TypeScript — clean UI logic and state handling.", tech: ["TypeScript", "Tool"], live: "#", github: "https://github.com/monjur0x/countdown" },
];

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

// Apply config
(function () {
  const c = window.SITE_CONFIG || {};
  if (c.name) {
    document.title = `${c.name} | Full-Stack Developer • Security Researcher`;
    const logo = document.getElementById("logoName"); if (logo) logo.textContent = c.shortName || c.name;
    const hero = document.getElementById("heroName"); if (hero) hero.textContent = c.name;
    const strong = document.querySelector("footer strong");
    if (strong) strong.innerHTML = `<span class="logo-mark">&lt;/&gt;</span> ${(c.shortName || "monjur0x0")}`;
    const foot = document.querySelector("footer .center");
    if (foot) foot.innerHTML = `© <span>${new Date().getFullYear()}</span> ${c.name}. Built with HTML/CSS/JS.`;
  }
  if (c.tagline) { const t = document.getElementById("heroTagline"); if (t) t.textContent = c.tagline; }
  if (c.email) { const e = document.getElementById("contactEmail"); if (e) e.textContent = c.email; }
  document.getElementById("year").textContent = new Date().getFullYear();
})();

window.addEventListener("load", () => document.body.classList.add("loaded"));
setTimeout(() => document.body.classList.add("loaded"), 800); // fallback

// Typing effect (rotates through all words, incl. reduced-motion fallback)
(function () {
  const DEFAULT_WORDS = ["Full-Stack Developer", "Security Researcher", "CTF Competitor", "Agentic AI Builder"];
  const words = (window.SITE_CONFIG && SITE_CONFIG.typedWords && SITE_CONFIG.typedWords.length ? SITE_CONFIG.typedWords : DEFAULT_WORDS);
  const el = document.getElementById("typed");
  if (!el) return;
  if (reducedMotion) {
    let wi = 0;
    el.textContent = words[0];
    if (words.length > 1) setInterval(() => { wi = (wi + 1) % words.length; el.textContent = words[wi]; }, 2500);
    return;
  }
  let wi = 0, ci = 0, del = false;
  (function tick() {
    const w = words[wi];
    el.textContent = w.slice(0, ci);
    if (!del && ci < w.length) { ci++; setTimeout(tick, 70); }
    else if (!del && ci === w.length) { del = true; setTimeout(tick, 1400); }
    else if (del && ci > 0) { ci--; setTimeout(tick, 35); }
    else { del = false; wi = (wi + 1) % words.length; setTimeout(tick, 300); }
  })();
})();

// ---- Custom mouse pointer: dot (instant) + ring (lerped) + glow (slow lerp) ----
(function () {
  if (!finePointer || reducedMotion) return;
  document.body.classList.add("custom-cursor");
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  const glow = document.getElementById("cursorGlow");
  let mx = -500, my = -500, rx = mx, ry = my, gx = mx, gy = my;
  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
  });
  (function loop() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    gx += (mx - gx) * 0.07; gy += (my - gy) * 0.07;
    ring.style.left = rx + "px"; ring.style.top = ry + "px";
    glow.style.left = gx + "px"; glow.style.top = gy + "px";
    requestAnimationFrame(loop);
  })();
  // grow on interactive hover
  const hoverables = "a, button, [data-tilt], input, textarea, .chip";
  document.addEventListener("mouseover", e => { if (e.target.closest(hoverables)) ring.classList.add("grow"); });
  document.addEventListener("mouseout", e => { if (e.target.closest(hoverables)) ring.classList.remove("grow"); });
  document.addEventListener("mousedown", () => { ring.style.scale = ".8"; });
  document.addEventListener("mouseup", () => { ring.style.scale = "1"; });
})();

// ---- Particles canvas (lightweight floating dots) ----
(function () {
  if (reducedMotion) return;
  const cv = document.getElementById("particles");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  let W, H, pts = [];
  function resize() {
    const r = cv.parentElement.getBoundingClientRect();
    W = cv.width = r.width; H = cv.height = r.height;
    pts = Array.from({ length: Math.min(70, W / 14) }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 2 + .6, green: Math.random() > .4
    }));
  }
  resize(); addEventListener("resize", resize);
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = p.green ? "rgba(16,185,129,.55)" : "rgba(59,130,246,.5)";
      ctx.fill();
    }
    requestAnimationFrame(draw);
  })();
})();

// ---- Scroll: progress bar, nav shrink, to-top, section spy ----
(function () {
  const bar = document.getElementById("progress");
  const nav = document.querySelector(".nav");
  const toTop = document.getElementById("toTop");
  const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
  const secs = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  function onScroll() {
    const h = document.documentElement;
    const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    bar.style.width = (pct * 100) + "%";
    nav.classList.toggle("scrolled", h.scrollTop > 10);
    toTop.classList.toggle("show", h.scrollTop > 600);
    let cur = null;
    for (const s of secs) if (s.getBoundingClientRect().top < 120) cur = "#" + s.id;
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === cur));
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toTop.onclick = () => scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
})();

// ---- Reveal on scroll (staggered via --d) ----
(function () {
  const ro = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); ro.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => ro.observe(el));
})();

// ---- Skill bars fill on view ----
(function () {
  const bo = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll(".bar i[data-w]").forEach(i => { i.style.width = i.dataset.w + "%"; });
    bo.unobserve(e.target);
  }), { threshold: .3 });
  const sg = document.getElementById("skillsGrid");
  if (sg) bo.observe(sg);
})();

// ---- 3D tilt cards ----
function bindTilt(scope = document) {
  if (!finePointer || reducedMotion) return;
  scope.querySelectorAll("[data-tilt]").forEach(card => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = "1";
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}
bindTilt();

// ---- Magnetic buttons ----
(function () {
  if (!finePointer || reducedMotion) return;
  document.querySelectorAll("[data-magnetic]").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * .15}px, ${y * .2}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });
})();

// ---- Projects render + filter (staggered pop-in) ----
function renderProjects(filter = "all") {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  PROJECTS.filter(p => filter === "all" || p.category === filter).forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "card proj-card";
    d.style.setProperty("--pd", (i * 0.07) + "s");
    d.setAttribute("data-tilt", "");
    d.innerHTML = `<div class="proj-img">${ICONS[p.icon] || ""}</div>
      <p class="post-date">${p.category}</p><h3>${p.title}</h3><p>${p.desc}</p>
      <div class="tags">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="proj-links">${p.live && p.live !== "#" ? `<a class="link" href="${p.live}" target="_blank" rel="noopener">Live →</a>` : ""}<a class="link" href="${p.github}" target="_blank" rel="noopener">GitHub →</a></div>`;
    grid.appendChild(d);
  });
  bindTilt(grid);
}
renderProjects();
document.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("[data-filter]").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  renderProjects(b.dataset.filter);
}));

// ---- Counters (run once) ----
(function () {
  const el = document.querySelector(".hero-stats");
  if (!el) return;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll("[data-count]").forEach(node => {
      const target = +node.dataset.count; let cur = 0;
      const step = () => {
        cur += Math.max(1, Math.round(target / 40));
        if (cur >= target) cur = target;
        node.textContent = cur + "+";
        if (cur < target) requestAnimationFrame(step);
      };
      step();
    });
    io.disconnect();
  }), { threshold: .4 });
  io.observe(el);
})();

// ---- Marquee is a pure CSS loop (two identical groups in HTML); self-heal stale caches ----
(function () {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;
  if (track.querySelectorAll(".marquee-group").length < 2) track.innerHTML += track.innerHTML;
})();

// Mobile nav
document.getElementById("navToggle").onclick = () => document.getElementById("navLinks").classList.toggle("open");
document.querySelectorAll("#navLinks a").forEach(a => a.onclick = () => document.getElementById("navLinks").classList.remove("open"));

// Contact form (demo: localStorage)
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const msg = Object.fromEntries(fd.entries());
  const all = JSON.parse(localStorage.getItem("messages") || "[]");
  all.push({ ...msg, at: new Date().toISOString() });
  localStorage.setItem("messages", JSON.stringify(all));
  document.getElementById("formNote").textContent = "✓ Message saved locally. Check localStorage 'messages'.";
  e.target.reset();
});
