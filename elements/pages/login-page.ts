import { expect, Locator } from '@playwright/test'

import { BasePage } from '../base-page'

export class LoginPage extends BasePage {
  readonly loginButtonLocator: Locator = this.page.locator('button:has-text("เข้าสู่ระบบ / ลงทะเบียน")')
  readonly emailInputLocator: Locator = this.page.locator('.login-popup #email')
  readonly passwordInputLocator: Locator = this.page.locator('.login-popup #password')
  readonly submitBtnLocator: Locator = this.page.locator('.login-popup button:has-text("เข้าสู่ระบบ")')

  readonly registerLinkLocator: Locator = this.page.locator('.login-popup span:has-text("ลงทะเบียน ฟรี!")')
  readonly acceptCookieButtonLocator: Locator = this.page.locator('button:has-text("ยอมรับทั้งหมด")')

  async goToRegister() {
    await this.loginButtonLocator.click()
    await this.acceptCookieButtonLocator.click()
    await this.registerLinkLocator.click()
  }

  async sumbitLogin(email: string, password: string) {
    await this.loginButtonLocator.click()
    await this.acceptCookieButtonLocator.click()
    await this.emailInputLocator.fill(email)
    await this.passwordInputLocator.fill(password)
    await this.submitBtnLocator.click()
  }

  async loginSuccess(urlPath: string) {
    await expect(this.page).toHaveURL(new RegExp(`${urlPath}`))
  }
}
