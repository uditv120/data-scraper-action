const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 64 + i);
const baseUrl = 'https://exam.sanand.workers.dev/seed-';
let total = 0;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {
    await page.goto(`${baseUrl}${seed}`, { waitUntil: 'networkidle' });
    const tableData = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );
    total += tableData.reduce((sum, val) => sum + val, 0);
  }

  console.log('✅ Total sum across tables:', total);
  await browser.close();
})();
