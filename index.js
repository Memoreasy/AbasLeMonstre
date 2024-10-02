import puppeteer from 'puppeteer';
import PDFDocument from 'pdfkit'
import fs from 'fs'

const nbrPage = 50

let doc = new PDFDocument({
  size: [491,589],
  margins : { // by default, all are 72
    top: 0,
    bottom:0,
    left: 0,
    right: 0
  }
})
doc.pipe(fs.createWriteStream('output.pdf'))

const browser = await puppeteer.launch({ args: [
    '--window-size=1964,2356',
    "--force-device-scale-factor=1"
  ]});

const page = await browser.newPage();
await page.setViewport({ width: 1964, height: 2356 });

const delay = ms => new Promise(res => setTimeout(res, ms));

// Navigate the page to a URL.
await page.goto('https://unr-ra.scholarvox.com/reader/docid/88915767/page/1');
await delay(2000);

await page.screenshot({
  path: 'avant.png',
});

let pageContainer = await page.$("#main-container")
console.info(pageContainer)
for (let i = 0; i < nbrPage; i++) {
  await page.screenshot({
    path: `./livre/${i}.png`,
  });
  await page.mouse.wheel({
    deltaY: 2369,
  });
  await delay(1500);
  doc.addPage().image(`./livre/${i}.png`, {
    fit: [491,589],
    align: 'center',
    valign: 'center'
  });
}

doc.end()

await browser.close();