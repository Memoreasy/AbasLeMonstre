import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://univ.scholarvox.com/reader/docid/88814086/page/1');

await page.screenshot({
    path: 'hn.png',
  });

// Set screen size.
await page.setViewport({width: 910, height: 1176});

await browser.close();