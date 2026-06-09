import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  
  // Scroll to the video testimonios section
  await page.evaluate(() => {
    const section = document.getElementById('video-testimonios');
    if (section) {
      section.scrollIntoView();
    }
  });
  
  // Wait a bit for the video to load
  await page.waitForTimeout(2000);
  
  // Take a screenshot of the testimonios section
  const videoSection = await page.locator('#video-testimonios');
  await videoSection.screenshot({ path: '/tmp/testimonios.png' });
  
  console.log('Screenshot taken');
  await browser.close();
})();
