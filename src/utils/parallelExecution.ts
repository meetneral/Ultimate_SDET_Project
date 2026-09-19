export interface TestCredential {
  id: string;
  username: string;
  password: string;
}

export interface TestExecutionContext {
  executionId: string;
  workerId: string;
  credential: TestCredential;
  apiToken: string;
  browserSessionId: string;
  customerIds: string[];
  orderIds: string[];
  emailIds: string[];
  createdAt: string;
  cleanup: string[];
}

export class CredentialPool {
  private readonly credentials: TestCredential[];
  private readonly inUse = new Set<string>();
  private readonly waitingResolvers: Array<(credential: TestCredential) => void> = [];

  constructor(credentials: TestCredential[]) {
    this.credentials = credentials;
  }

  async acquire(preferredId?: string): Promise<TestCredential> {
    const nextAvailable = this.credentials.find(
      (credential) =>
        !this.inUse.has(credential.id) &&
        (!preferredId || credential.id === preferredId),
    );

    if (nextAvailable) {
      this.inUse.add(nextAvailable.id);
      return nextAvailable;
    }

    return new Promise((resolve) => {
      this.waitingResolvers.push((credential) => {
        this.inUse.add(credential.id);
        resolve(credential);
      });
    });
  }

  release(credential: TestCredential): void {
    if (!credential?.id) {
      return;
    }

    this.inUse.delete(credential.id);
    const nextAvailable = this.credentials.find((candidate) => !this.inUse.has(candidate.id));

    if (nextAvailable && this.waitingResolvers.length > 0) {
      const resolveNext = this.waitingResolvers.shift();
      if (resolveNext) {
        this.inUse.add(nextAvailable.id);
        resolveNext(nextAvailable);
      }
    }
  }
}

export function generateUniqueId(prefix: string): string {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}-${suffix}`;
}

export function createExecutionContext(
  credential: TestCredential,
  workerId: string,
): TestExecutionContext {
  return {
    executionId: generateUniqueId('execution'),
    workerId,
    credential,
    apiToken: generateUniqueId('token'),
    browserSessionId: generateUniqueId('browser-session'),
    customerIds: [],
    orderIds: [],
    emailIds: [],
    createdAt: new Date().toISOString(),
    cleanup: [],
  };
}

export function registerTestData(
  context: TestExecutionContext,
  data: {
    customerId?: string;
    orderId?: string;
    emailId?: string;
    cleanupAction?: string;
  },
): TestExecutionContext {
  if (data.customerId) {
    context.customerIds.push(data.customerId);
  }

  if (data.orderId) {
    context.orderIds.push(data.orderId);
  }

  if (data.emailId) {
    context.emailIds.push(data.emailId);
  }

  if (data.cleanupAction) {
    context.cleanup.push(data.cleanupAction);
  }

  return context;
}

export function cleanupExecutionContext(context: TestExecutionContext): TestExecutionContext {
  const cleanupPlan = [...context.cleanup];

  return {
    ...context,
    cleanup: cleanupPlan,
    customerIds: [...context.customerIds],
    orderIds: [...context.orderIds],
    emailIds: [...context.emailIds],
  };
}
