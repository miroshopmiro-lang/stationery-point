// Minimal GitHub OAuth proxy for Decap CMS on Cloudflare Workers.
// Decap opens /auth in a popup; GitHub redirects back to /callback, which
// exchanges the code for a token and hands it to the CMS via postMessage.
//
// Required bindings (see ../docs/cms-setup.md):
//   GITHUB_CLIENT_ID     - vars or secret
//   GITHUB_CLIENT_SECRET - secret (wrangler secret put GITHUB_CLIENT_SECRET)

// JSON stringify that cannot break out of a <script> context.
const safeJson = (v) => JSON.stringify(v).replace(/</g, '\\u003c');

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      // CSRF protection: bind the OAuth round-trip to this browser via a
      // state value stored in an HttpOnly cookie and verified on /callback.
      const state = crypto.randomUUID();
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
      authUrl.searchParams.set('scope', 'repo,user');
      authUrl.searchParams.set('state', state);
      return new Response(null, {
        status: 302,
        headers: {
          Location: authUrl.toString(),
          'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=600`,
        },
      });
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const cookieState = (request.headers.get('Cookie') || '').match(/oauth_state=([^;]+)/)?.[1];
      if (!code) return new Response('Missing code', { status: 400 });
      if (!state || !cookieState || state !== cookieState) {
        return new Response('Invalid OAuth state — please close this window and try logging in again.', { status: 403 });
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await tokenRes.json();

      const payload = data.error
        ? `authorization:github:error:${JSON.stringify({ error: data.error })}`
        : `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`;

      // Standard Decap handshake: announce, wait for the CMS to reply, then
      // deliver the token to the opener window.
      const html = `<!doctype html>
<html><body><script>
  (function () {
    var payload = ${safeJson(payload)};
    function receiveMessage(e) {
      window.opener.postMessage(payload, e.origin);
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
<p>Signing you in… you can close this window if it does not close itself.</p>
</body></html>`;
      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'Set-Cookie': 'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=0',
          'Cache-Control': 'no-store',
        },
      });
    }

    return new Response('Decap CMS OAuth proxy for Stationery Point (/auth, /callback)', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
