import { readdirSync, chmodSync } from 'fs';
import { join } from 'path';

const binDir = './node_modules/.bin';

try {
  const files = readdirSync(binDir);
  files.forEach(file => {
    const filePath = join(binDir, file);
    chmodSync(filePath, 0o755);
    console.log(`Fixed permissions for: ${file}`);
  });
  console.log('All permissions fixed!');
} catch (err) {
  console.error('Error fixing permissions:', err.message);
  process.exit(0);
}
