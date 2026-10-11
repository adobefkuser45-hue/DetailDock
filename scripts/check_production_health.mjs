async function checkEndpoints() {
  const endpoints = [
    { name: 'Vercel Production Frontend', url: 'https://client-mauve-zeta-13.vercel.app' },
    { name: 'Render Backend Health Check', url: 'https://detaildock-api.onrender.com/api/v1/health' },
    { name: 'Render Public Catalog API', url: 'https://detaildock-api.onrender.com/api/v1/services' },
    { name: 'Render Studio Settings API', url: 'https://detaildock-api.onrender.com/api/v1/studio/settings' }
  ];

  console.log('--- DetailDock Production Endpoint Verification ---');
  for (const ep of endpoints) {
    const start = Date.now();
    try {
      const res = await fetch(ep.url);
      const duration = Date.now() - start;
      console.log(`[PASS] ${ep.name}: Status ${res.status} (${duration}ms)`);
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        console.log(`       Payload:`, JSON.stringify(data).slice(0, 130) + '...');
      }
    } catch (err) {
      console.log(`[FAIL] ${ep.name}: ${err.message}`);
    }
  }
}

checkEndpoints();
