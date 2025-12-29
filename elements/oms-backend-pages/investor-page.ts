import { expect, Locator } from '@playwright/test'

import { BasePage } from '../base-page'

export class InvestorPage extends BasePage {
  readonly bookingButtonLocator: Locator = this.page.locator('button:has(.icon-add):has-text("ซื้อสิทธ์การลงทุน")')
  readonly buyBookingLocator: Locator = this.page.locator('button:has-text("ชำระเงิน")')
  readonly qrPromPayLocator: Locator = this.page.locator('div.cardHeader:has-text("QR พร้อมเพย์")')
  readonly confirmButtonLocator: Locator = this.page.locator('button:has-text("ยืนยันการชำระเงิน")')
  readonly payByQRCodeLocator: Locator = this.page.locator('button:has-text("For Test")')
  readonly buttonForTestLocator: Locator = this.page.locator('button', { hasText: 'For Test' })

  async investorBooking() {
    await this.bookingButtonLocator.nth(0).click()
    await this.buyBookingLocator.click()
    await this.qrPromPayLocator.click()
    await this.confirmButtonLocator.click()
    // await this.payByQRCodeLocator.click()
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.getByRole('button', { name: 'For Test' }).click()
    ])
    await newPage.waitForLoadState('domcontentloaded')
    await newPage.locator('button.btn-greenais', { hasText: 'จ่าย' }).click()
    await newPage.locator('span.mdc-button__label', { hasText: 'ตกลง' }).click()
    await this.page.bringToFront()
    await this.page.waitForURL(/\/return_success\?/, { timeout: 30_000 })
    // await this.page.waitForSelector('button', { hasText: 'กลับหน้าสิทธิ์การลงทุน' })
    await expect(this.page).toHaveURL(/return_success/)
  }
}
