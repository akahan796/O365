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

## Auto-deploy

Any change to this folder is automatically committed and pushed to `main` at the
end of each Claude Code turn via a **Stop hook** (`.claude/o365-autodeploy.sh`),
which triggers a Vercel redeploy. No manual commit/push needed.
