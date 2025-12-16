import { Page, BrowserContext, expect } from '@playwright/test';

export class testDataHelper {
  constructor(private context: BrowserContext) {}

  static newInbox(prefix = 'qa'): { email: string; inbox: string } {
    const stamp = Date.now();
    const inbox = `${prefix}_${stamp}`;    
    return { email: `${inbox}@yopmail.com`, inbox };
  }

  async openInbox(inbox: string): Promise<Page> {
    const page = await this.context.newPage();
    await page.goto('https://yopmail.com/en/');
    await page.locator('#login').fill(inbox);

    await page.locator('#refreshbut, #refresh').first().click();

    await expect(page.frameLocator('#ifinbox').locator('body')).toBeVisible();
    return page;
  }

  async waitForEmail(page: Page, {
    subjectContains,
    timeoutMs = 60_000,
    pollIntervalMs = 2_000,
  }: { subjectContains?: RegExp | string; timeoutMs?: number; pollIntervalMs?: number }) {
    const deadline = Date.now() + timeoutMs;
    const inboxFrame = page.frameLocator('#ifinbox');

    while (Date.now() < deadline) {
      await page.locator('#refresh, #refreshbut').first().click();

      const rows = inboxFrame.locator('.m'); 
      const count = await rows.count();
      if (count > 0) {
        
        if (subjectContains) {
          for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const subject = (await row.innerText()).trim();
            const isMatch = (subjectContains instanceof RegExp)
              ? subjectContains.test(subject)
              : subject.includes(subjectContains);
            if (isMatch) return row;
          }
        } else {
          return rows.first();
        }
      }
      await page.waitForTimeout(pollIntervalMs);
    }
    throw new Error(`Timed out waiting for email${subjectContains ? ` matching "${subjectContains}"` : ''}`);
  }

  async openEmailRow(page: Page, rowLocator: ReturnType<Page['locator']>) {
    await rowLocator.click();
    const mailFrame = page.frameLocator('#ifmail');
    await expect(mailFrame.locator('body')).toBeVisible();
    return mailFrame;
  }

  async extractCode(mailFrame: ReturnType<Page['frameLocator']>, regex: RegExp = /\b(\d{6})\b/) {
    const bodyText = await mailFrame.locator('body').innerText();
    const m = bodyText.match(regex);
    if (!m) throw new Error('Verification code not found in email body');
    return m[1];
  }

  async clickLinkByText(mailFrame: ReturnType<Page['frameLocator']>, text: RegExp | string) {
    const link = mailFrame.getByRole('link', { name: text });
    await expect(link).toBeVisible();
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      link.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  static newPhone(): string {
    const prefixes = ['06', '08', '09'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const number = Math.floor(10000000 + Math.random() * 90000000);
    return `${prefix}${number}`;
  }

  static newIdCard(): string {
    const digits: number[] = [];

    for (let i = 0; i < 12; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += digits[i] * (13 - i);
    }
    const checkDigit = (11 - (sum % 11)) % 10;
    digits.push(checkDigit);

    return digits.join('');
  }
}
