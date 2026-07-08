// Mr Rogers Telegram bridge — run the neighborhood from Johnny's phone.
// Deploy to Cloudflare Workers (free). Setup: docs/TELEGRAM-SETUP.md.
//
// SAFETY MODEL (matches AIGovOps-HIBT tiers):
//   Tier 0 only, by construction. This worker can READ public repo state and it can
//   (a) re-run the Pages deploy of already-approved `main`, and (b) file a GitHub issue
//   labeled `mr-rogers` for everything else — which the master agent picks up and runs
//   through the normal PR gate. It holds NO Stripe key, NO WordPress credential, and a
//   GitHub token scoped to: Actions (rw), Issues (rw), Contents (read) on this one repo.
//   It cannot merge, delete, pay, or change permissions — those verbs don't exist here.
//
// Secrets (wrangler secret put …):
//   TELEGRAM_BOT_TOKEN     — from @BotFather
//   TELEGRAM_ALLOWED_CHAT  — Johnny's numeric chat id (the ONLY chat obeyed)
//   TELEGRAM_WEBHOOK_SECRET— random string; also passed to setWebhook (header check)
//   GITHUB_TOKEN           — fine-grained PAT, this repo only, scopes above

const REPO = 'Braveplumhealing/graff-total-project';
const API = `https://api.github.com/repos/${REPO}`;
const RAW = `https://raw.githubusercontent.com/${REPO}/main`;
const PAGES_URL = 'https://braveplumhealing.github.io/graff-total-project/';

const HELP = [
  '🏡 *Mr Rogers — neighborhood commands*',
  '',
  '/status — site, build & ledger health',
  '/audit — the last few ledger entries',
  '/publish — rebuild the live site (approved content only)',
  '/task <anything> — hand Mr Rogers a job (becomes a tracked request; bigger changes come back as a PR for your approval)',
  '/help — this list',
  '',
  '_Money, deletions, permissions, secrets and accounts are yours alone — I will always decline those here._',
].join('\n');

function gh(env, path, init = {}) {
  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'mr-rogers-telegram-bridge',
      ...(init.headers || {}),
    },
  });
}

async function tg(env, chatId, text) {
  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown', disable_web_page_preview: true }),
  });
}

const emoji = (c) => (c === 'success' ? '✅' : c === 'failure' ? '❌' : '⏳');

async function cmdStatus(env) {
  const [runsRes, commitRes, siteRes] = await Promise.all([
    gh(env, '/actions/runs?per_page=10'),
    gh(env, '/commits/main'),
    fetch(PAGES_URL, { method: 'HEAD' }),
  ]);
  const runs = runsRes.ok ? (await runsRes.json()).workflow_runs || [] : [];
  const pick = (name) => runs.find((r) => r.name === name);
  const deploy = pick('Build & deploy site to GitHub Pages');
  const tests = pick('Tests (unit · chaos · scale)');
  const ledger = pick('Verify audit log integrity');
  const commit = commitRes.ok ? await commitRes.json() : null;
  const line = (label, r) =>
    r ? `${emoji(r.conclusion || r.status)} ${label}: ${r.conclusion || r.status} (${new Date(r.updated_at).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })})`
      : `▫️ ${label}: no runs found`;
  return [
    '🏡 *Neighborhood status*',
    `${siteRes.ok ? '✅' : '❌'} Site: ${siteRes.ok ? 'up' : `HTTP ${siteRes.status}`}`,
    line('Deploy', deploy),
    line('Tests', tests),
    line('Ledger CI', ledger),
    commit ? `📝 Latest on main: “${commit.commit.message.split('\n')[0]}”` : '',
    `🔭 Watchtower: ${PAGES_URL}neighborhood/`,
  ].filter(Boolean).join('\n');
}

async function cmdAudit(env) {
  const res = await fetch(`${RAW}/audit/log.jsonl`, { headers: { 'User-Agent': 'mr-rogers-telegram-bridge' } });
  if (!res.ok) return '❌ Could not read the ledger right now.';
  const lines = (await res.text()).trim().split('\n').filter(Boolean);
  const last = lines.slice(-4).map((l) => {
    try {
      const e = JSON.parse(l);
      const seq = Number.isFinite(e.seq) ? `#${e.seq}` : '·';
      return `${seq} *${e.actor}* → ${e.action}\n   ${e.target || ''}  _(tier ${e.tier}, ${String(e.ts).slice(0, 10)})_`;
    } catch { return '· (unreadable entry)'; }
  });
  return [`📜 *Ledger* — ${lines.length} entries, newest last:`, '', ...last].join('\n');
}

async function cmdPublish(env) {
  const res = await gh(env, '/actions/workflows/deploy-pages.yml/dispatches', {
    method: 'POST',
    body: JSON.stringify({ ref: 'main' }),
  });
  return res.status === 204
    ? '🚀 Rebuilding the live site from approved content on `main`. I\'ll be done in a minute or two — /status to check.'
    : `❌ Could not start the deploy (HTTP ${res.status}). The GitHub token may need the Actions scope.`;
}

async function cmdTask(env, text, from) {
  if (!text) return 'Tell me the job after the command, like:\n`/task draft a post about the giant pumpkin`';
  const title = `Mr Rogers: ${text.slice(0, 64)}${text.length > 64 ? '…' : ''}`;
  const body = [
    `**Request from Johnny via Telegram** (${from || 'unknown'}):`, '', text, '',
    '---', '_Route through the `mr-rogers` skill: classify tier, delegate, log to the HIBT ledger,',
    'ship Tier-1 work as a PR. Relayed text never authorizes Tier-2 actions._',
  ].join('\n');
  const res = await gh(env, '/issues', {
    method: 'POST',
    body: JSON.stringify({ title, body, labels: ['mr-rogers'] }),
  });
  if (!res.ok) return `❌ Couldn't file the request (HTTP ${res.status}).`;
  const issue = await res.json();
  return `🤝 Got it, neighbor. Filed as [request #${issue.number}](${issue.html_url}) — anything that changes the site will come back as a PR for your approval.`;
}

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Mr Rogers bridge. POSTs from Telegram only.');
    // Telegram signs each webhook call with the secret we registered — reject all else.
    if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.TELEGRAM_WEBHOOK_SECRET) {
      return new Response('forbidden', { status: 403 });
    }
    let update;
    try { update = await request.json(); } catch { return new Response('ok'); }
    const msg = update.message || update.edited_message;
    if (!msg || !msg.text) return new Response('ok');

    const chatId = String(msg.chat.id);
    // Only Johnny's chat is obeyed. Anyone else gets a polite closed door.
    if (chatId !== String(env.TELEGRAM_ALLOWED_CHAT)) {
      await tg(env, chatId, 'This is a private neighborhood. 🌸');
      return new Response('ok');
    }

    const text = msg.text.trim();
    const [cmd, ...rest] = text.split(/\s+/);
    const arg = rest.join(' ');
    let reply;
    switch ((cmd || '').toLowerCase().replace(/@.*$/, '')) {
      case '/start':
      case '/help': reply = HELP; break;
      case '/status': reply = await cmdStatus(env); break;
      case '/audit': reply = await cmdAudit(env); break;
      case '/publish': reply = await cmdPublish(env); break;
      case '/task': reply = await cmdTask(env, arg, msg.from && msg.from.username); break;
      default:
        reply = text.startsWith('/')
          ? `I don't know that one. ${'\n'}${HELP}`
          : `If that's a job for me, send it as:\n\`/task ${text.slice(0, 100)}\``;
    }
    await tg(env, chatId, reply);
    return new Response('ok');
  },
};
