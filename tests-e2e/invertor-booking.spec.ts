import { test } from '@fixtures/e2e-fixture'

test('Investor booking', async ({ configuration, page, loginPage, investorPage }) => {
  const user = configuration.users.userInvestor
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('investor')
  await investorPage.investorBooking()
})
