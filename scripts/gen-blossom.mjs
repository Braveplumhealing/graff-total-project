// Emits the final Brave Plum blossom (variant C, 80% petal opacity) as an SVG
// fragment for a viewBox where (0,0) is the flower center. Usage:
//   node gen-blossom.mjs <idPrefix> [light]
// "light" swaps the center disc to rose for light backgrounds.
const [idp = 'bp', mode = 'dark'] = process.argv.slice(2);
const OP = 0.8;
const r2 = n => Math.round(n * 100) / 100;

function petalPath(w, tip, notch) {
  return `M0 -1C${r2(-w*0.7)} -3 ${-w} ${r2(-tip*0.45)} ${r2(-w*0.82)} ${r2(-tip*0.75)}C${r2(-w*0.66)} ${r2(-tip*0.97)} ${r2(-w*0.28)} ${-tip} -3 ${r2(-tip+notch)}C-1 ${r2(-tip+notch+1.2)} 1 ${r2(-tip+notch+1.2)} 3 ${r2(-tip+notch)}C${r2(w*0.28)} ${-tip} ${r2(w*0.66)} ${r2(-tip*0.97)} ${r2(w*0.82)} ${r2(-tip*0.75)}C${w} ${r2(-tip*0.45)} ${r2(w*0.7)} -3 0 -1Z`;
}
function stamens(n, r0, r1, fil, anth, seed) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = (i/n)*Math.PI*2 + Math.sin(i*seed)*0.14;
    const len = r1 + Math.sin(i*2.3+seed)*2.2;
    const x1 = r2(Math.sin(a)*r0), y1 = r2(-Math.cos(a)*r0);
    const x2 = r2(Math.sin(a)*len), y2 = r2(-Math.cos(a)*len);
    const mx = r2(Math.sin(a+0.06)*(len*0.55)), my = r2(-Math.cos(a+0.06)*(len*0.55));
    s += `<path d="M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}" stroke="${fil}" stroke-width=".9" fill="none" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="1.5" fill="${anth}"/>`;
  }
  return s;
}
const defs = `<defs><radialGradient id="${idp}a" cx="50%" cy="85%" r="85%"><stop offset="0%" stop-color="#FDE8EE"/><stop offset="55%" stop-color="#F2B8C6"/><stop offset="100%" stop-color="#EDA5BA"/></radialGradient><radialGradient id="${idp}b" cx="50%" cy="85%" r="85%"><stop offset="0%" stop-color="#FBD9E2"/><stop offset="60%" stop-color="#EDA5BA"/><stop offset="100%" stop-color="#E293AC"/></radialGradient></defs>`;
let petals = '';
[0,72,144,216,288].forEach((rot,i)=>{
  petals += `<g transform="rotate(${rot})"><path d="${petalPath(16,36,2)}" fill="url(#${idp}${i%2?'b':'a'})" fill-opacity=".8"/><path d="M0 -8C-1.2 -16 -1.2 -24 0 -31" stroke="#E293AC" stroke-width=".8" fill="none" stroke-opacity=".48" stroke-linecap="round"/></g>`;
});
const center = mode === 'light'
  ? `<circle r="4.2" fill="#C4637E"/>` + stamens(9,3.2,10,'#FDE8EE','#C4637E',1.1)
  : `<circle r="4.2" fill="#FDE8EE" fill-opacity=".95"/>` + stamens(9,3.2,10,'#FDE8EE','#C4637E',1.1);
console.log(defs + `<g transform="rotate(-6)">${petals}${center}</g>`);
