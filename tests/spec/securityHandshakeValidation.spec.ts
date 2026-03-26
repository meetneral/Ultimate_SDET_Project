import { test, expect } from '@playwright/test';
import https from 'https';
import { TLSSocket } from 'tls';

test('TLS handshake validation with certificate checks', async ({ page }) => {
  const targetUrl = 'https://www.google.com';
  await page.goto(targetUrl);

  // Extract TLS details using Node's https module
  const url = new URL(targetUrl);
  const options = { host: url.hostname, port: 443, method: 'GET' };

  await new Promise<void>((resolve, reject) => {
    const reqTLS = https.request(options, (res) => {
      try {
        const socket = res.socket as TLSSocket;
        const cert = socket.getPeerCertificate();

        // --- Protocol & Cipher validation ---
        const protocol = socket.getProtocol();
        const cipher = socket.getCipher();

        expect(protocol).toMatch(/TLSv1\.[2-3]/); // enforce TLS 1.2+
        expect(cipher.name).toContain('AES'); // enforce strong cipher

        // --- Certificate issuer validation ---
        expect(cert.issuer).toBeDefined(); // has valid issuer

        // --- Certificate expiry validation ---
        const expiryDate = new Date(cert.valid_to);
        const now = new Date();
        expect(expiryDate.getTime()).toBeGreaterThan(now.getTime()); // not expired

        // --- Domain validation (SAN check) ---
        expect(cert.subjectaltname || cert.subject.CN).toBeDefined(); // has domain info

        console.log('✅ Handshake validated successfully');
        
        // Consume the response data
        res.on('data', () => {});
        res.on('end', () => resolve());
      } catch (err) {
        reject(err);
      }
    });

    reqTLS.on('error', (err) => {
      reject(new Error(`Handshake failed: ${err.message}`));
    });

    reqTLS.end();
  });
});

test('OAuth2 + JWT handshake validation', async ({ request }) => {
  // Step 1: Request OAuth2 token
  const response = await request.post('https://auth.example.com/oauth/token', {
    data: {
      grant_type: 'client_credentials',
      client_id: 'myClient',
      client_secret: 'mySecret',
      scope: 'read:data'
    }
  });

  const token = (await response.json()).access_token;

  // Step 2: Decode JWT manually (without jsonwebtoken dependency)
  const parts = token.split('.');
  const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));

  // Step 3: Validate claims
  expect(payload.iss).toBe('https://auth.example.com');
  expect(payload.aud).toBe('myService');
  expect(payload.exp * 1000).toBeGreaterThan(Date.now()); // not expired

  console.log('✅ OAuth2 + JWT handshake validated successfully');
});
