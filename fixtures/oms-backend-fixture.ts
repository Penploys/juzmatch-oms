// fixtures/e2e-fixture.ts
import { test as base, expect } from '@playwright/test'
import { LoginPage } from '@services/configurations/base-configurtaion'
import { RegisterPage } from '@elements/pages/register-page'
import { E2EConfiguration } from '@services/configurations/e2e-configuration'

interface E2ETestFixtures {
  configuration: E2EConfiguration
  loginPage: LoginPage
  registerPage: RegisterPage
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
  }
})

export { expect }
