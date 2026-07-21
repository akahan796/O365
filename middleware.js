// ─────────────────────────────────────────────────────────────────────────────
// Vercel Edge Middleware — SERVER-SIDE access gate.
//
// Every request (except the login page, the auth API, and public assets) must
// carry a valid session cookie whose value matches SESSION_TOKEN — a secret you
// set as a Vercel Environment Variable. No valid cookie → redirect to /login.html.
//
// Because the check runs on the edge (the server) and the cookie value is a
// server-only secret, protected pages are NEVER served to an unauthenticated
// visitor. This is real auth, not a client-side JavaScript trick.
// ─────────────────────────────────────────────────────────────────────────────

const COOKIE_NAME = 'o365_auth'; // must match api/login.js and api/logout.js

// Paths that are reachable WITHOUT logging in. Add any public asset your login
// page needs (a logo, a font file, etc.). Everything else is gated.
// This is a build-time static config, so it can't reference variables.
export const config = {
  matcher: ['/((?!api/|login\\.html|fonts/|brandmark\\.svg|logo\\.png|favicon\\.ico|robots\\.txt|assets/).*)'],
};

export default function middleware(request) {
  const cookie = request.headers.get('cookie') || '';
  const m = cookie.match(new RegExp('(?:^|;\\s*)' + COOKIE_NAME + '=([^;]+)'));
  const token = m ? m[1] : '';
  const secret = process.env.SESSION_TOKEN;

  if (secret && token && token === secret) {
    return; // authenticated — let the request through
  }
  return Response.redirect(new URL('/login.html', request.url), 302);
}
