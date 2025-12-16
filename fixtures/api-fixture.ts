import { test as base } from '@playwright/test'

import { LoginService } from '@api-services/login-service'
import { APIContextManager } from '@services/api-request/api-context-manager'
import { APIConfiguration } from '@services/configurations/api-configuration'

interface APITestFixtures {
  configuration: APIConfiguration

  apiContextManager: APIContextManager

  loginService: LoginService
}

const test = base.extend<APITestFixtures>({
  configuration: async ({}, use) => {
    const configuration = new APIConfiguration()
    await use(configuration)
  },
  apiContextManager: async ({ playwright, request }, use) => {
    const apiContextManager = new APIContextManager(playwright.request, request)
    await use(apiContextManager)
  },
  loginService: async ({ apiContextManager, configuration }, use) => {
    const loginService = new LoginService(apiContextManager, configuration)
    await use(loginService)
  }
})

export { test }
