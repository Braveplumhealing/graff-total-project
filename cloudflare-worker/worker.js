// GitHub OAuth relay for Sveltia/Decap CMS — lets the /admin "Sign In with GitHub"
// button work on a static host (GitHub Pages). Deploy to Cloudflare Workers (free).
//
// Secrets (set via `wrangler secret put`): GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.
// These come from a GitHub OAuth App you create (see docs/SIGN-IN-WITH-GITHUB.md).
//
// Routes:
//   /auth     → redirect the user to GitHub's authorize screen
//   /callback → exchange the code for a token and hand it back to the CMS popup

const GH_AUTHORIZE = 'https://github.com/login/oauth/authorize';
const GH_TOKEN = 'https://github.com/login/oauth/access_token';

function popupResponse(status, payload) {
  // Canonical Netlify/Decap CMS popup handshake.
  const body = `<!doctype html><html><body><script>
  (function(){
    function receive(e){
      if(!e.data || e.data !== 'authorizing:github') return;
      window.removeEventListener('message', receive, false);
      window.opener.postMessage(
        'authorization:github:${status}:${JSON.stringify(payload)}',
        e.origin
      );
    }
    window.addEventListener('message', receive, false);
    window.opener && window.opener.postMessage('authorizing:github', '*');
  })();
  </script><p>Completing sign-in…</p></body></html>`;
  return new Response(body, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const state = crypto.randomUUID();
      const redirect = `${url.origin}/callback`;
      const authUrl = new URL(GH_AUTHORIZE);
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirect);
      authUrl.searchParams.set('scope', url.searchParams.get('scope') || 'repo,user');
      authUrl.searchParams.set('state', state);
      return new Response(null, {
        status: 302,
        headers: {
          Location: authUrl.toString(),
          // Bind state to the browser to mitigate CSRF.
          'Set-Cookie': `csrf=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
        },
      });
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const cookie = (request.headers.get('Cookie') || '').match(/csrf=([^;]+)/);
      if (!code || !state || !cookie || cookie[1] !== state) {
        return popupResponse('error', { message: 'Invalid OAuth state' });
      }
      const res = await fetch(GH_TOKEN, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await res.json();
      if (data.error || !data.access_token) {
        return popupResponse('error', { message: data.error_description || 'Token exchange failed' });
      }
      return popupResponse('success', { token: data.access_token, provider: 'github' });
    }

    return new Response('Sveltia CMS auth relay. Use /auth.', { status: 200 });
  },
};
