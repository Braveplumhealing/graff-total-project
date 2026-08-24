// Changes every build so browsers re-fetch the stylesheet after each deploy
// (stale-CSS fix, 2026-08-23 — Johnny saw yesterday's banner spacing).
module.exports = () => Date.now().toString(36);
