# monjur0x0 — Portfolio

Personal portfolio of Monjurul Haque Rajun — Full-Stack Developer, Security Researcher, CTF competitor and Agentic AI builder.

Dark theme, Space Grotesk, emerald primary. Sections: Hero / About / Skills / Services / Projects / CTF record / Certifications / Writeups / Contact.

## Use
Open `index.html` directly, or serve:
```bash
cd /home/monjur0x0/portfolio
python3 -m http.server 8080
# -> http://localhost:8080
```

## Customize
Edit `config.js`:
```js
SITE_CONFIG = { name, role, tagline, email, ... }
```
- Projects: edit `PROJECTS` array in `script.js`
- Skills/Services/Writeups/About: edit `index.html`
- Colors/fonts: edit `:root` in `styles.css`

## Deploy
Vercel / Netlify / GitHub Pages / Cloudflare Pages — just upload this folder (no build step).
