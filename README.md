# O365 — OneStream 365 Excel Add-In Prototype

Pixel-perfect (1:1) HTML prototype of the OneStream 365 Excel Add-In **Default Interface**,
built from Figma (`Excel Add-In`, node `10331:10627`).

- Self-contained static site — open `index.html` or serve the folder.
- The entire Excel chrome (title bar, ribbon tabs, formula bar, grid, sheet/status bars,
  task pane) is built as **fluid HTML/CSS** — it fills the browser edge-to-edge and reflows
  at any size. The worksheet grid is generated with JS to fill the available space.
- `assets/icons/*.svg` — exact OneStream ribbon icons exported from Figma.
- Colors and geometry (col 64px, row 19px, title-bar green `#227e4d`, gridline `#dddddd`,
  selection `#217346`, etc.) were measured pixel-by-pixel from the Figma design.

Live on Vercel (auto-deploys on every push to `main`).

## Access gate (password + portal)

The site is protected by a **server-side password gate** (Vercel Edge Middleware +
Edge Functions) — a shared password unlocks it, no accounts.

- `middleware.js` — gates every path except the public allowlist; no valid cookie → `/login.html`.
- `api/login.js` / `api/logout.js` — check the password / clear the session (cookie `o365_auth`).
- `login.html` — the branded **login screen**.
- `portal.html` — the **dashboard**: launcher tiles (HTML prototype + Figma) + sign out. Login lands here.
- `index.html` — the gated prototype itself.

**Required Vercel env vars** (Settings → Environment Variables → Production, then redeploy):

| Name | Value |
|------|-------|
| `ACCESS_PASSWORD` | the password users type |
| `SESSION_TOKEN` | a long random string — `openssl rand -hex 32` |

Until these are set on a fresh deployment, the gate denies everyone. The gate needs
Vercel's edge runtime — it does **not** run under a plain local static server
(`python -m http.server`); the `login.html`/`portal.html` pages still render locally,
but the auth flow only works on Vercel (or `vercel dev`).

## Auto-deploy

Any change to this folder is automatically committed and pushed to `main` at the
end of each Claude Code turn via a **Stop hook** (`.claude/o365-autodeploy.sh`),
which triggers a Vercel redeploy. No manual commit/push needed.
