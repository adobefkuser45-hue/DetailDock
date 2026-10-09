import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const token = process.env.VERCEL_TOKEN;

async function deployToVercel() {
  console.log('[Vercel Deployment]: Deploying client to Vercel production...');
  try {
    const output = execSync(`npx vercel deploy --prod --yes --token=${token}`, {
      cwd: path.resolve(__dirname),
      encoding: 'utf8'
    });
    console.log('[Vercel Deployment]: Success!');
    console.log(output);
  } catch (err) {
    console.error('[Vercel Deployment Error]:', err.stdout || err.message);
  }
}

deployToVercel();
