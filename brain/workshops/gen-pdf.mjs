import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const IN = process.env.IN || 'couples-workbook.html';
const OUT = process.env.OUT || 'The-Space-Between-Us.pdf';

// Corner blossom (blush petals, rose pistil) — stamped bottom-right of every printed page.
const blossom = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g fill="#F2B8C6" opacity="0.6">`
  + `<ellipse cx="20" cy="11" rx="5.4" ry="8"/>`
  + `<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(72 20 20)"/>`
  + `<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(144 20 20)"/>`
  + `<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(216 20 20)"/>`
  + `<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(288 20 20)"/>`
  + `</g><circle cx="20" cy="20" r="3.3" fill="#C4637E" opacity="0.6"/></svg>`;
const b64 = Buffer.from(blossom).toString('base64');
const footer = `<div style="width:100%;height:100%;margin:0;padding:0;position:relative;">`
  + `<img src="data:image/svg+xml;base64,${b64}" style="position:absolute;right:14mm;bottom:6mm;width:9mm;height:9mm;">`
  + `</div>`;

const url = 'file://' + fs.realpathSync(IN);
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.pdf({
    path: OUT,
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: footer,
    timeout: 120000,
  });
  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log('wrote', OUT, kb + 'KB');
} finally {
  await browser.close();
}
