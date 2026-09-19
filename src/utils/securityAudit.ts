import fs from 'fs';
import path from 'path';

export async function scanProjectForSensitiveData(rootDir: string = './tests') {
  const sensitivePatterns = [
    /\/\/\?\s*password\s*[:=]\s*["']?[^"'\s]+["']?/i,
    /apiKey\s*[:=]\s*["'][^"']+["']/i,
    /jwtToken\s*[:=]\s*["'][^"']+["']/i,
    /AKIA[0-9A-Z]{16}/,
    /[A-Za-z0-9\/+=]{40}/,
  ];

  const violations: string[] = [];
  const whitelist = ['SecurityAgent.ts'];

  const scanDir = async (dir: string) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await scanDir(fullPath);
        continue;
      }

      if (!/\.(ts|js|json)$/i.test(file)) {
        continue;
      }

      if (whitelist.some((name) => fullPath.endsWith(name))) {
        continue;
      }

      const content = fs.readFileSync(fullPath, 'utf-8');
      for (const pattern of sensitivePatterns) {
        if (pattern.test(content)) {
          violations.push(`❌ Sensitive data found in ${fullPath} (pattern: ${pattern})`);
        }
      }
    }
  };

  await scanDir(rootDir);

  if (violations.length > 0) {
    console.error('Security violations detected:\n' + violations.join('\n'));
    throw new Error('❌ Project contains sensitive data. See violations above.');
  }

  return true;
}

export async function enforceSecurity(projectRoot: string = './tests') {
  console.log('Enforcing security rules...');
  const requiredVars = ['DB_PASSWORD', 'API_KEY', 'JWT_SECRET'];

  for (const variable of requiredVars) {
    if (!process.env[variable]) {
      console.warn(`⚠️ Missing required env var: ${variable}`);
    }
  }

  await scanProjectForSensitiveData(projectRoot);
  console.log('Security rules enforced.');
}
