# Learnings — what building this business taught us

Distilled operating wisdom from the whole journey (June–July 2026). Technical gotchas live
in `docs/RUNBOOK.md`; these are the lessons that shape how the BUSINESS runs. Deposit new
ones as they're earned (see The Deposit Rule, `brain/INDEX.md`).

## About trust (the product IS trust)
1. **Made-up content is poison here.** Invented episodes, stats, and testimonials nearly
   shipped as "real." On a healing brand, one discovered fake costs more than ten missing
   features. Rule: unconfirmed → `⚠ VERIFY` or absent. Johnny chose *absent* every time.
2. **Don't promise what doesn't exist.** "Join the newsletter" with no newsletter was a
   quiet trust leak. Copy may only reference what's live.
3. **Warmth is the brand's load-bearing wall.** Both times something broke ("lost its
   warmth" on WordPress, unstyled fragments on the .com), Johnny noticed the *feeling*
   before the mechanics. Test for warmth like you test for uptime.

## About Johnny (how to serve him well)
4. **Plain language in, three warm lines out** (the Sweater Covenant). He decides fast and
   clearly when given a recommendation and one question. Never a quiz, never homework.
5. **"Automatic is our magic word."** Bias every design toward self-running with human
   gates — not human-running with automatic assists. He'll say yes to automation and no
   to chores.
6. **He answers direction, not detail.** "Remove it / $450 / no / free for now" — crisp
   directives. Bring him decisions shaped like that.
7. **His yes is specific.** A "sure" is not authorization for credentials or production
   writes; the explicit sentence is. The safety system enforcing this repeatedly proved
   *right*.

## About the machine (how the work stays durable)
8. **One source of truth, many mirrors — and know which is which.** GitHub is master;
   the designed site is canonical; WordPress is a neighbor, not a mirror. Confusing those
   roles caused the only real incidents.
9. **Boundaries are features.** Agents that CANNOT touch money/secrets/deletions made
   every bold automation safe to say yes to. Sell the limits as hard as the powers.
10. **Every step logged beats every step remembered.** The hash-chained ledger settled
    "what happened?" instantly, survived a two-timeline merge (replay, never hand-merge),
    and caught its own weaknesses via the chaos monkey.
11. **Docs lie unless forced honest.** The same-PR rule (reality change + doc change
    together) is the only thing that kept RUNBOOK/CLAUDE.md true across parallel sessions.
12. **Parallel Claude surfaces WILL build simultaneously.** Rebase, replay ledger entries,
    reconcile brains — and treat the other timeline's work with respect; it's usually good.
13. **Verify with your eyes, not your assumptions.** Screenshot-after-deploy caught the
    unstyled-fragment disaster that all the 200-status checks called "healthy."

## About the money
14. **Collection is automatable; movement never is.** Links, prices, and buttons are agent
    work. Payouts, refunds, deactivating old links — Johnny's dashboard, always.
15. **Price changes have a shadow step:** the OLD payment link keeps working until a human
    deactivates it. Always surface that in the report.
