export interface GeneratedTestData {
  customerId: string;
  orderId: string;
  email: string;
  transactionId: string;
  cartId: string;
  createdAt: string;
}

export class TestDataFactory {
  static generateCustomerId(prefix = 'customer'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  static generateOrderId(prefix = 'order'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  static generateEmail(prefix = 'user'): string {
    return `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 6)}@example.com`;
  }

  static generateTransactionId(prefix = 'txn'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  static generateCartId(prefix = 'cart'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  static createBundle(overrides: Partial<GeneratedTestData> = {}): GeneratedTestData {
    const createdAt = new Date().toISOString();

    return {
      customerId: overrides.customerId ?? this.generateCustomerId(),
      orderId: overrides.orderId ?? this.generateOrderId(),
      email: overrides.email ?? this.generateEmail(),
      transactionId: overrides.transactionId ?? this.generateTransactionId(),
      cartId: overrides.cartId ?? this.generateCartId(),
      createdAt,
    };
  }

  static attachToExecutionContext<T extends { customerIds: string[]; orderIds: string[]; emailIds: string[]; cleanup: string[] }>(
    executionContext: T,
    bundle: GeneratedTestData,
  ): T {
    executionContext.customerIds.push(bundle.customerId);
    executionContext.orderIds.push(bundle.orderId);
    executionContext.emailIds.push(bundle.email);
    executionContext.cleanup.push(`delete customer ${bundle.customerId}`);
    executionContext.cleanup.push(`delete order ${bundle.orderId}`);
    executionContext.cleanup.push(`delete email ${bundle.email}`);
    return executionContext;
  }
}
