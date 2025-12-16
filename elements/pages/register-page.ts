import { expect, Locator } from '@playwright/test'
import { testDataHelper } from '../../services/utils/testData';

import { BasePage } from '../base-page'

export class RegisterPage extends BasePage {
  readonly emailInputLocator: Locator = this.page.locator('.login-popup #email')
  readonly submitButtonLocator: Locator = this.page.locator('.login-popup button:has-text("ดำเนินการต่อ")')
  readonly investorCheckboxLocator: Locator = this.page.locator('.login-popup h5:has-text("นักลงทุน")')
  readonly confirmButtonLocator: Locator = this.page.locator('.login-popup button:has-text("ยืนยัน")')
  readonly nameInputLocator: Locator = this.page.locator('.login-popup #regster_name')
  readonly lastNameInputLocator: Locator = this.page.locator('.login-popup #regster_lastname')
  readonly phoneInputLocator: Locator = this.page.locator('.login-popup #regster_phone')
  readonly idCardNumberInputLocator: Locator = this.page.locator('.login-popup #regster_idcardnumber')
  readonly passwordInputLocator: Locator = this.page.locator('.login-popup #password')
  readonly confirmPasswordInputLocator: Locator = this.page.locator('.login-popup #con_password')
  readonly consentCheckbox1Locator: Locator = this.page.locator('.login-popup #consent1')
  readonly consentCheckbox2Locator: Locator = this.page.locator('.login-popup #consent2')
  readonly confirmRegisterButtonLocator: Locator = this.page.locator('.login-popup button:has-text("ลงทะเบียน")')


  async sumbitRegister(email: string, password: string, name: string, lastName: string, phone: string, idCardNumber: string) {
    await this.emailInputLocator.fill(email)
    await this.submitButtonLocator.click()
    await this.investorCheckboxLocator.click()
    await this.confirmButtonLocator.click()
    await this.nameInputLocator.fill(name)
    await this.lastNameInputLocator.fill(lastName)
    await this.phoneInputLocator.fill(phone)
    await this.idCardNumberInputLocator.fill(idCardNumber)
    await this.confirmButtonLocator.click()    
    await this.passwordInputLocator.fill(password)
    await this.confirmPasswordInputLocator.fill(password)
    await this.consentCheckbox1Locator.click()
    await this.consentCheckbox2Locator.click()
    await this.confirmRegisterButtonLocator.click()
  } 


  

}