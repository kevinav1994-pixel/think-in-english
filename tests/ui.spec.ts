import { test, expect } from '@playwright/test';

test.describe('Think in English localhost UI', () => {
  test('desktop homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173?e2e=true', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true });
  });

  test('mobile homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173?e2e=true', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
  });

  test('visual baseline desktop', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('http://localhost:5173?e2e=true', { waitUntil: 'networkidle' });

    await page.addStyleTag({
      content: `
        *,
        *::before,
        *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
          caret-color: transparent !important;
        }
      `,
    });

    await page.waitForFunction(() => document.fonts?.status === 'loaded');

    await page.evaluate(async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      const step = Math.floor(window.innerHeight * 0.8);

      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await delay(250);
      }

      window.scrollTo(0, 0);
    });

    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      timeout: 15000,
    });
  });
});