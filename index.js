import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Navigate the page to a URL.
await page.goto('https://univ.scholarvox.com/reader/docid/88814086/page/1');

console.info("avant")
await delay(20000);
console.info("après")

await page.screenshot({
    path: 'hn.png',
  });

// Set screen size.
await page.setViewport({width: 1000, height: 913});

await browser.close();