import { expect, Locator } from '@playwright/test'

import { BasePage } from '../base-page'

export class RegisterPage extends BasePage {
  readonly emailInputLocator: Locator = this.page.locator('#regster_email')
  readonly submitButtonLocator: Locator = this.page.locator('.login-popup button:has-text("ดำเนินการต่อ")')
  readonly investorCheckboxLocator: Locator = this.page.locator('.login-popup h5:has-text("นักลงทุน")')
  readonly confirmButtonLocator: Locator = this.page.locator('button:has-text("ยืนยัน")')
  readonly nameInputLocator: Locator = this.page.locator('.login-popup #regster_name')
  readonly lastNameInputLocator: Locator = this.page.locator('.login-popup #regster_lastname')
  readonly phoneInputLocator: Locator = this.page.locator('.login-popup #regster_phone')
  readonly idCardNumberInputLocator: Locator = this.page.locator('.login-popup #regster_idcardnumber')
  readonly passwordInputLocator: Locator = this.page.locator('.login-popup #password')
  readonly confirmPasswordInputLocator: Locator = this.page.locator('.login-popup #con_password')
  readonly consentCheckbox1Locator: Locator = this.page.locator('.login-popup #consent1')
  readonly consentCheckbox2Locator: Locator = this.page.locator('.login-popup #consent2')
  readonly confirmRegisterButtonLocator: Locator = this.page.locator('.login-popup button:has-text("ลงทะเบียน ฟรี!")')
  readonly prefixNameButtonRadioLocator: Locator = this.page.locator('label:has-text("นางสาว")')
  readonly acceptCookieButtonLocator: Locator = this.page.locator('button:has-text("ยอมรับทั้งหมด")')
  readonly errorMassageEmailLocator: Locator = this.page.locator('#regster_email + .error-msg')
  readonly errorMassagePrefixNameLocator: Locator = this.page.locator('[data-testid="error_msg_prefixname"]')
  readonly errorMassageNameLocator: Locator = this.page.locator('[data-testid="error_msg_name"]')
  readonly errorMassageLastNameLocator: Locator = this.page.locator('[data-testid="error_msg_lastname"]')
  readonly errorMassageIDCardLocator: Locator = this.page.locator('[data-testid="error_msg_idcardnumber"]')
  readonly errorMassagePhoneNumberLocator: Locator = this.page.locator('[data-testid="error_msg_phonenumber"]')

  async sumbitRegister(
    email: string,
    password: string,
    name: string,
    lastName: string,
    phone: string,
    idCardNumber: string
  ) {
    await this.investorCheckboxLocator.click()
    await this.confirmButtonLocator.click()
    await this.emailInputLocator.fill(email)
    await this.prefixNameButtonRadioLocator.click()
    await this.nameInputLocator.fill(name)
    await this.lastNameInputLocator.fill(lastName)
    await this.idCardNumberInputLocator.fill(idCardNumber)
    await this.phoneInputLocator.fill(phone)
    await this.confirmRegisterButtonLocator.click()
    await this.passwordInputLocator.fill(password)
    await this.confirmPasswordInputLocator.fill(password)
    await this.consentCheckbox1Locator.click()
    await this.consentCheckbox2Locator.click()
    await this.confirmRegisterButtonLocator.click()
  }

  async sumbitRegisterNoData() {
    await this.investorCheckboxLocator.click()
    await this.confirmButtonLocator.click()
    await this.confirmButtonLocator.click()
  }

  //do function validate
  async sumbitRegisterNoDataCheckValidate() {
    await expect(this.errorMassageEmailLocator).toHaveText('กรุณาระบุอีเมล')
    await expect(this.errorMassagePrefixNameLocator).toHaveText('กรุณาเลือกคำนำหน้าชื่อ')
    await expect(this.errorMassageNameLocator).toHaveText('กรุณาระบุชื่อ')
    await expect(this.errorMassageLastNameLocator).toHaveText('กรุณาระบุนามสกุล')
    await expect(this.errorMassageIDCardLocator).toHaveText('กรุณาระบุเลขบัตรหมายเลขบัตรประชาชน')
    await expect(this.errorMassagePhoneNumberLocator).toHaveText('กรุณาระบุเบอร์โทรศัพท์')
  }
}
