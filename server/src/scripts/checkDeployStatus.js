import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const apiKey = process.env.RENDER_API_KEY || 'rnd_SOMLhgI7uSRcz1wT2KAjdpa3f6gv';
const serviceId = 'srv-db4bs9vlk1mc73fhjong';
const deployId = 'dep-db4cqrrbc2fs73bcskag';

async function check() {
  const res = await fetch(`https://api.render.com/v1/services/${serviceId}/deploys/${deployId}`, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
  const d = await res.json();
  console.log('Render Deploy Status:', d.status);
}

check();
