import { test, expect } from '../../fixtures/parallel-fixture';
import { TestDataFactory } from '../../utils/testDataFactory';
import { registerTestData } from '../../utils/parallelExecution';

test.describe('Enterprise smoke: parallel-safe execution', () => {
  test('should isolate credentials and generated test data per execution', async ({ executionContext }) => {
    const bundle = TestDataFactory.createBundle();
    registerTestData(executionContext, {
      customerId: bundle.customerId,
      orderId: bundle.orderId,
      emailId: bundle.email,
      cleanupAction: `delete customer ${bundle.customerId}`,
    });

    expect(executionContext.credential.id).toMatch(/user-/);
    expect(executionContext.customerIds).toContain(bundle.customerId);
    expect(executionContext.orderIds).toContain(bundle.orderId);
    expect(executionContext.emailIds).toContain(bundle.email);
    expect(executionContext.cleanup.length).toBeGreaterThan(0);
  });
});
