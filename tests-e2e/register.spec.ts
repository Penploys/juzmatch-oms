import { test } from '@fixtures/e2e-fixture'

// test('Seller able to register', async ({ configuration, page, loginPage, registerPage }) => {
//   const { email, inbox } = testDataHelper.newInbox('seller')
//   const phone = testDataHelper.newPhone()
//   const idCardNumber = testDataHelper.newIdCard()

//   const user = configuration.users.userSeller
//   await page.goto(configuration.appSetting.baseURL)
//   await loginPage.goToRegister()

//   await registerPage.sumbitRegister(email, 'Test@1234', 'Test', 'Test', phone, idCardNumber)
//   await page.waitForTimeout(5000)
//   const yopmail = new testDataHelper(page.context())
//   const yopmailPage = await yopmail.openInbox(inbox)
//   const emailRow = await yopmail.waitForEmail(yopmailPage, { subjectContains: '<UAT> Verify Email Juzmatch' })
//   const mailFrame = await yopmail.openEmailRow(yopmailPage, emailRow)
//   const confirmLink = await mailFrame.locator('a:has-text("ยืนยันตัวตน")').first().getAttribute('href')
//   if (!confirmLink) throw new Error('Confirmation link not found in email')
//   await page.goto(confirmLink)

//   await loginPage.sumbitLogin(email, 'Test@1234')
//   await loginPage.loginSuccess('seller')
// })

//สปายคุงทำข้อ 10
test('Investor able to register no Data', async ({ configuration, page, loginPage, registerPage }) => {
  await page.goto(configuration.appSetting.baseURL)

  await loginPage.goToRegister()

  await registerPage.sumbitRegisterNoData()
  await registerPage.sumbitRegisterNoDataCheckValidate()
  await page.waitForTimeout(5000)
})
