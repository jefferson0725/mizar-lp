import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshot.png' });
    console.log('✓ App loaded successfully');
    console.log('✓ Screenshot saved to screenshot.png');
  } catch (error) {
    console.error('✗ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
