// Emits the Brave Plum EMBLEM — the canonical Ink & Petal blossom seated on a
// continuous twig with two leaves, held in a fine ring — as an SVG inner
// fragment for viewBox="-50 -50 100 100". Adopted 2026-08-22 (Johnny: the twig
// "gives the blossom a reference"; the circle feels "captured and displayed";
// the twig must read CONTINUOUS — petals are opaque here and the stem is
// masked out beneath the flower so both visible ends sit on one smooth curve).
//
//   node gen-emblem.mjs <idPrefix> [light|dark]
//
// "light" = for light backgrounds (plum twig, rose ring, rose flower center).
// "dark"  = for dark/plum backgrounds (petal-toned twig and ring, light center).
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const [idp = 'bpe', mode = 'light'] = process.argv.slice(2);
const here = dirname(fileURLToPath(import.meta.url));
const blossom = execSync(
  `node ${join(here, 'gen-blossom.mjs')} ${idp} ${mode === 'light' ? 'light' : ''}`,
  { encoding: 'utf8' }
).trim().replace(/fill-opacity="\.8"/g, 'fill-opacity="1"');

const twig = mode === 'light' ? '#7A3070' : '#EDA5BA';
const ring = mode === 'light' ? '#C4637E' : '#F2B8C6';
const leafA = mode === 'light' ? '#EDA5BA' : '#F2B8C6';
const leafB = mode === 'light' ? '#F2B8C6' : '#FBD9E2';
const vein = '#C4637E';

console.log(
  `<mask id="${idp}cut"><rect x="-50" y="-50" width="100" height="100" fill="white"/><circle cx="-3" cy="-8" r="23" fill="black"/></mask>` +
  `<circle r="40" fill="none" stroke="${ring}" stroke-width="1.3" stroke-opacity=".75"/>` +
  `<g mask="url(#${idp}cut)">` +
  `<path d="M-36 42C-20 26 4 2 28 -16" stroke="${twig}" stroke-width="2" fill="none" stroke-linecap="round"/>` +
  `<path d="M-36 42C-31 37 -28 34 -24 30" stroke="${twig}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `</g>` +
  `<g transform="translate(27,-15) rotate(-38)"><path d="M0 0C5 -3 12 -3 16 1C12 5 5 5 0 0Z" fill="${leafA}" fill-opacity=".9"/><path d="M1 .4C6 .4 11 .4 15 .8" stroke="${vein}" stroke-width=".7" fill="none" stroke-opacity=".6"/></g>` +
  `<g transform="translate(33,-24) rotate(-58)"><path d="M0 0C4.5 -2.6 10.5 -2.6 14 .9C10.5 4.4 4.5 4.4 0 0Z" fill="${leafB}" fill-opacity=".9"/><path d="M1 .3C5 .3 9 .3 13 .7" stroke="${vein}" stroke-width=".7" fill="none" stroke-opacity=".6"/></g>` +
  `<g transform="translate(-3,-8) scale(.78)">${blossom}</g>`
);
