import { BasePage } from '@elements/base-page'
import { Locator, expect } from '@playwright/test'
import { env } from 'process'

export class BaseConfiguration {
  settings: {
    baseUrl: string
    baseApiUrl: string
  }

  constructor(settings: { baseUrl: string; baseApiUrl: string }) {
    this.settings = settings
  }

  isTestOnCI(): boolean {
    return env.CI !== undefined
  }
}

export class LoginPage extends BasePage {
  readonly loginButtonLocator: Locator = this.page.locator('button:has-text("เข้าสู่ระบบ / ลงทะเบียน")')
  readonly emailInputLocator: Locator = this.page.locator('.login-popup #email')
  readonly passwordInputLocator: Locator = this.page.locator('.login-popup #password')
  readonly submitBtnLocator: Locator = this.page.locator('.login-popup button:has-text("เข้าสู่ระบบ")')

  readonly registerLinkLocator: Locator = this.page.locator('.login-popup span:has-text("ลงทะเบียน ฟรี!")')
  readonly acceptCookieButtonLocator: Locator = this.page.locator('button:has-text("ยอมรับทั้งหมด")')
  readonly closePopupLocator: Locator = this.page.locator('[aria-label="Close popup"]')

  async goToRegister() {
    await this.closePopupLocator.click()
    await this.acceptCookieButtonLocator.click()
    await this.loginButtonLocator.click()
    await this.registerLinkLocator.click()
  }

  async sumbitLogin(email: string, password: string) {
    await this.closePopupLocator.click()
    await this.acceptCookieButtonLocator.click()
    await this.loginButtonLocator.click()
    await this.emailInputLocator.fill(email)
    await this.passwordInputLocator.fill(password)
    await this.submitBtnLocator.click()
  }

  async loginSuccess(urlPath: string) {
    // await this.page.waitForURL(`**/${urlPath}/**`, { timeout: 30_000 })
    await expect(this.page).toHaveURL(new RegExp(`${urlPath}`))
  }
}
