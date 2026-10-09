import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const apiKey = process.env.RENDER_API_KEY;
const serviceId = 'srv-db4bs9vlk1mc73fhjong';

async function triggerDeploy() {
  console.log(`[Render Deployment]: Triggering deploy for service ${serviceId}...`);
  const res = await fetch(`https://api.render.com/v1/services/${serviceId}/deploys`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ clearCache: 'do_not_clear' })
  });

  const data = await res.json();
  console.log('[Render Deployment]: Response status:', res.status);
  console.log('[Render Deployment]: Deploy ID:', data.id);
  console.log('[Render Deployment]: Status:', data.status);
  console.log('[Render Deployment]: Commit:', data.commit?.id, data.commit?.message);
}

triggerDeploy().catch(console.error);
