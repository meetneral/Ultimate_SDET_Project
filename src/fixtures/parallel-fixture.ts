import { test as base } from '@playwright/test';
import { CredentialPool, createExecutionContext, TestExecutionContext } from '../utils/parallelExecution';
import { enterpriseCredentials } from '../data/enterprise-credentials';
import { LoginPage } from '../page/LoginPage';
import { SidebarPage } from '../page/SidebarPage';

export type ParallelExecutionFixture = {
  executionContext: TestExecutionContext;
  sidebarPage: SidebarPage;
};

type ParallelWorkerFixtures = {
  credentialPool: CredentialPool;
};

export const test = base.extend<ParallelExecutionFixture, ParallelWorkerFixtures>({
  credentialPool: [async ({}, use) => {
    const pool = new CredentialPool(enterpriseCredentials);
    await use(pool);
  }, { scope: 'worker' }],

  executionContext: async ({ credentialPool }, use, workerInfo) => {
    const workerCredential = enterpriseCredentials[workerInfo.workerIndex];
    if (!workerCredential) {
      throw new Error(
        `Worker ${workerInfo.workerIndex} has no dedicated credential. ` +
          `Configure workers to ${enterpriseCredentials.length} or fewer.`,
      );
    }
    const credential = await credentialPool.acquire(workerCredential.id);

    const ctx = createExecutionContext(
      credential,
      `worker-${workerInfo.workerIndex}`,
    );

    await use(ctx);

    credentialPool.release(credential);
  },

  sidebarPage: async ({ page, executionContext }, use) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);

    await loginPage.goto();
    await loginPage.login(
      executionContext.credential.username,
      executionContext.credential.password,
    );
    await sidebarPage.expectVisible();

    await use(sidebarPage);
  },
});

export { expect } from '@playwright/test';
