import { test } from '@fixtures/e2e-fixture'

test('Seller add new asset', async ({ configuration, page, loginPage, sellerPage }) => {
  const user = configuration.users.userSeller
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('seller')

  await sellerPage.sellerAddSellerInformation()
  await sellerPage.addProjectInformation()
  await sellerPage.addSellingPrice()
  await sellerPage.addAddressProject()
  await sellerPage.addFurniture()
  await sellerPage.confirmAddNewProject()
  await sellerPage.viewNewAsset()
  await page.waitForTimeout(5000)
})

test('Seller add new asset no data', async ({ configuration, page, loginPage, sellerPage }) => {
  const user = configuration.users.userSeller
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('seller')
  await sellerPage.sellerAddSellerInformationNoData()
  await page.waitForTimeout(5000)
})

test('Seller view detail asset', async ({ configuration, page, loginPage, sellerPage }) => {
  const user = configuration.users.userSeller
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('seller')
  await sellerPage.sellerViewAsset()
  await page.waitForTimeout(5000)
})

test('Seller view asset by announce code', async ({ configuration, page, loginPage, sellerPage }) => {
  const user = configuration.users.userSeller
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('seller')
  await sellerPage.sellerViewAssetByAnnounceCode()
  await page.waitForTimeout(5000)
})

test('Seller view asset by house name', async ({ configuration, page, loginPage, sellerPage }) => {
  const user = configuration.users.userSeller
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('seller')
  await sellerPage.sellerViewAssetByHouseName()
  await page.waitForTimeout(5000)
})

test('Seller edit detail asset', async ({ configuration, page, loginPage, sellerPage }) => {
  const user = configuration.users.userSeller
  await page.goto(configuration.appSetting.baseURL)
  await loginPage.sumbitLogin(user.email, user.password)
  await loginPage.loginSuccess('seller')
  await sellerPage.editProjectInformation()
  await sellerPage.editSellingPrice()
  await sellerPage.editAddressProject()
  await sellerPage.editFurniture()
  await sellerPage.confirmEditNewProject()
  await sellerPage.viewEditNewAsset()
  await page.waitForTimeout(5000)
})
