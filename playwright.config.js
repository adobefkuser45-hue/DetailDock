import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    headless: true,
    viewport: { width: 1280, height: 800 }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: [
    {
      command: 'node server/src/server.js',
      port: 5000,
      timeout: 30000,
      reuseExistingServer: true
    },
    {
      command: 'node node_modules/vite/bin/vite.js client',
      port: 5173,
      timeout: 30000,
      reuseExistingServer: true
    }
  ]
});
