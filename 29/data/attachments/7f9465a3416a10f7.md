# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Authencity.spec.ts >> Authenticity >> Redirection of Page
- Location: tests/spec/MuscleBlaze/Authencity.spec.ts:16:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('//*[@id="const_web_main_container"]/div[2]/div[1]/div/div[11]/div[2]/div/a[1]/div[2]')

```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { time } from 'node:console';
  3  | 
  4  | export class Authenticity {
  5  |   public checkAuthenticity: Locator;
  6  |   public authenticity: Locator;
  7  |   public chatSupport: Locator;
  8  |   public businessSupport: Locator;
  9  |   public uniquePincode: Locator;
  10 |   public mobileNumber: Locator;
  11 |   public email: Locator;
  12 |   public checkNowBtn: Locator;
  13 |   public protienLabCertificate: Locator;
  14 |   public CertifiedLabReport: Locator;
  15 |   constructor(public page: Page) {
  16 |     this.checkAuthenticity = page.locator('//*[@id="const_web_main_container"]/div[2]/div[1]/div/div[11]/div[2]/div/a[1]/div[2]');
  17 |     // this.checkAuthenticity = page.locator('text="Check Authenticity"');
  18 |     this.authenticity = page.locator('text=" Authenticity"');
  19 |     this.chatSupport = page.locator('text="Chat Support"');
  20 |     this.businessSupport = page.locator('text="Business Support"');
  21 |     this.uniquePincode = page.locator('//*[@id="#code"]');
  22 |     this.mobileNumber = page.locator('//*[@id="phoneNumber"]');
  23 |     this.email = page.locator('//*[@id="email"]');
  24 |     this.checkNowBtn = page.locator('//button[@id="auth-form"]');
  25 |     this.protienLabCertificate = page.locator('text="Protein Lab Certificate"');
  26 |     this.CertifiedLabReport = page.locator('text="Certified Lab Report"');
  27 |     this.CertifiedLabReport = page.locator('text="Certified Lab Report"');
  28 |   }
  29 | 
  30 |   bySelector(selector: string): Locator {
  31 |     return this.page.locator(selector);
  32 |   }
  33 | 
  34 |   byXpath(xpath: string): Locator {
  35 |     return this.page.locator(`xpath=${xpath}`);
  36 |   }
  37 | 
  38 |   async navigate() {
  39 |     await this.page.goto('https://www.muscleblaze.com/');
  40 |   }
  41 | 
  42 |   async clickCheckAunthenticity(label: Locator) {
> 43 |     await this.checkAuthenticity.click();
     |                                  ^ Error: locator.click: Target page, context or browser has been closed
  44 |   }
  45 | 
  46 |   async Aunthenticity(label: Locator) {
  47 |     await this.authenticity.hover();
  48 |   }
  49 | 
  50 |   async fillDetails() {
  51 |     await this.uniquePincode.fill("#H876643" );
  52 |     await this.mobileNumber.fill("9876543211");
  53 |     await this.email.fill("test@example.com");
  54 |   }
  55 |   async clickCheckNow(label: Locator) {
  56 |     await this.checkNowBtn.click();
  57 |   }
  58 | 
  59 |   async clickProtienLabCertificate(label: Locator) {
  60 |     await this.protienLabCertificate.click();
  61 |   }
  62 | 
  63 |   async clickCertifiedLabReport(label: Locator) {
  64 |     await this.CertifiedLabReport.isVisible();
  65 |   }
  66 |   async searchByBatch(label: Locator) {
  67 |    await this.page.getByRole('textbox', { name: 'e.g.: AWPFCF165' }).click();
  68 |   await this.page.getByRole('textbox', { name: 'e.g.: AWPFCF165' }).click();
  69 |   await this.page.getByRole('textbox', { name: 'e.g.: AWPFCF165' }).click();
  70 |   await this.page.getByRole('textbox', { name: 'e.g.: AWPFCF165' }).fill('AIZDVF0050');
  71 |   await expect(this.page.getByRole('cell', { name: 'AIZDVF0050' })).toBeVisible();
  72 |   }
  73 | }
  74 | 
```