import { Frame,test, expect } from '@playwright/test';
import { IframeUtil } from '../../src/utils/iframe.utils';





test('iframe util works', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/demo.html');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('h1');

  const frameElement = await page.$('iframe#myFrame');
  if (!frameElement) {
    throw new Error('Frame element not found');
  }

//   const frame: Frame | null = await frameElement.evaluate((element: SVGElement | HTMLElement) => {
//     return (element.ownerDocument as Document)?.defaultView as any as Frame;
//   });
const frame: Frame | null = await frameElement.contentFrame();
  if (!frame) {
    throw new Error('Frame not found');
  }

  const iframeUtil = new IframeUtil(frame);

  const elements = await iframeUtil.getContentsOfIframes();
  console.log(`Found ${elements.length} elements`);

  await iframeUtil.updateContentInIframe('<html><body><h1>Hello from the iframe!</h1></body></html>');
  await expect(frame.locator('h1')).toHaveText('Hello from the iframe!');
});


test.skip('iframe util works', async ({ page }) => {
await page.goto('http://localhost:3000/test.html');
await page.waitForSelector('h1');
const frameElement = await page.$('iframe#myFrame');
if (!frameElement) {
  throw new Error('Frame element not found');
}

const frame: Frame | null = await frameElement.evaluate((element: SVGElement | HTMLElement) => {
  return (element.ownerDocument as Document)?.defaultView as Frame | unknown as Frame;
});

if (!frame) {
  throw new Error('Frame not found');
}
  const iframeUtil = new IframeUtil(frame);
  const elements = await iframeUtil.getContentsOfIframes();
  console.log(`Found ${elements.length} elements`);

  await iframeUtil.updateContentInIframe('<html><body><h1>Hello!</h1></body></html>');
  await expect(frame.locator('h1')).toHaveText('Hello!');
});