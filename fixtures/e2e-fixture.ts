// fixtures/e2e-fixture.ts
import { test as base, expect } from '@playwright/test'
import { LoginPage } from '@services/configurations/base-configurtaion'
import { RegisterPage } from '@elements/pages/register-page'
import { E2EConfiguration } from '@services/configurations/e2e-configuration'
import { SellerPage } from '@elements/pages/seller-page'
import { InvestorPage } from '@elements/oms-backend-pages/investor-page'

interface E2ETestFixtures {
  configuration: E2EConfiguration
  loginPage: LoginPage
  registerPage: RegisterPage
  sellerPage: SellerPage
  investorPage: InvestorPage
}

export const test = base.extend<E2ETestFixtures>({
  configuration: async ({}, use) => {
    const configuration = new E2EConfiguration()
    await use(configuration)
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page))
  },
  sellerPage: async ({ page }, use) => {
    await use(new SellerPage(page))
  },
  investorPage: async ({ page }, use) => {
    await use(new InvestorPage(page))
  }
})

export { expect }
