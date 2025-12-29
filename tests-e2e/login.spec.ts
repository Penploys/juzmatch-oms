import { test } from '@fixtures/e2e-fixture'

test('Seller able to login', async ({ configuration, page, loginPage }) => {
  const user = configuration.users.userSeller
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('seller')
})

test('Buyer able to login', async ({ configuration, page, loginPage }) => {
  const user = configuration.users.userBuyer
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('property')
})

test('Investor able to login', async ({ configuration, page, loginPage }) => {
  const user = configuration.users.userInvestor
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('investor')
})
