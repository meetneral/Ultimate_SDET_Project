import { Page, Locator } from '@playwright/test';

export interface LocatorRuleSet {
  avoidDollar: boolean;
  avoidXPath: boolean;
  preferDataTestId: boolean;
  preferGetByRole: boolean;
  preferLocator: boolean;
}

export const defaultLocatorRules: LocatorRuleSet = {
  avoidDollar: true,
  avoidXPath: true,
  preferDataTestId: true,
  preferGetByRole: true,
  preferLocator: true,
};

export function validateSelector(selector: string, rules: Partial<LocatorRuleSet> = defaultLocatorRules) {
  const merged = { ...defaultLocatorRules, ...rules };

  if (merged.avoidDollar && selector.includes('page.$(')) {
    throw new Error('Rule violation: page.$() is not allowed');
  }

  if (merged.avoidXPath && selector.trim().startsWith('//')) {
    throw new Error('Rule violation: XPath is discouraged');
  }

  return true;
}

export function getValidatedLocator(page: Page, selector: string, rules?: Partial<LocatorRuleSet>): Locator {
  validateSelector(selector, rules);
  return page.locator(selector);
}
