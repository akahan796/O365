# O365 — OneStream 365 Excel Add-In Prototype

Pixel-perfect (1:1) HTML prototype of the OneStream 365 Excel Add-In **Default Interface**,
built from Figma (`Excel Add-In`, node `10331:10627`).

- Self-contained static site — open `index.html` or serve the folder.
- `assets/bg.png` — Excel chrome (1440×820).
- `assets/icons/*.svg` — exact ribbon icons exported from Figma.

Live on Vercel (auto-deploys on every push to `main`).

## Auto-deploy

Any change to this folder is automatically committed and pushed to `main` at the
end of each Claude Code turn via a **Stop hook** (`.claude/o365-autodeploy.sh`),
which triggers a Vercel redeploy. No manual commit/push needed.
