# monjur0x — Portfolio

Personal portfolio of Monjurul Haque Rajun — Full-Stack Developer, Security Researcher, CTF competitor and Agentic AI builder.

Dark theme, Space Grotesk, emerald primary. Sections: Hero / About / Skills / Services / Projects / CTF record / Certifications / Writeups / Contact.

## Customize
Edit `config.js`:
```js
SITE_CONFIG = { name, role, tagline, email, ... }
```
- Projects: edit `PROJECTS` array in `script.js`
- Skills/Services/Writeups/About: edit `index.html`
- Colors/fonts: edit `:root` in `styles.css`

## Contact form backend
Messages are stored in **Turso** (free-forever LibSQL — never pauses, unlike Supabase).
The form POSTs to `/api/contact`, a Vercel serverless function that writes to Turso.
Credentials live in Vercel env vars, never in client code.

Setup (one time):
```bash
# 1. Create the database
turso db create portfolio-contact
turso db shell portfolio-contact < turso.sql
turso db tokens create portfolio-contact

# 2. Add env vars to your Vercel project (Settings -> Environment Variables)
#    TURSO_DATABASE_URL  = turso db show --url portfolio-contact
#    TURSO_AUTH_TOKEN    = token from the command above

# 3. Read messages anytime
turso db shell portfolio-contact "select * from contact_messages order by created_at desc;"
```

Without the env vars set, the function still answers 200 on validation errors but
returns 500 on insert — the site keeps working (form shows an error note, and the
`localStorage` fallback in `script.js` handles the "unconfigured" case).

## Deploy
Vercel — upload this folder (the `api/` directory becomes serverless functions; `npm install` runs automatically for `@libsql/client`).
