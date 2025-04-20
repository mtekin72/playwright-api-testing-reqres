
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

export default defineConfig({
  tsconfig: "./tsconfig.json",
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 3,// Retries each failing test up to 3 times
  workers: 4,

  reporter: [
    ['list'],
    ['junit', { outputFile: 'results/test-results.xml' }],  // JUnit XML report for Jenkins
    ['html', { open: 'never' }]                            // HTML report for local/CI viewing
  ],

  use: {
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  projects: [
    {
      name: "API",
      testDir: "./tests/API",
      use: {
        baseURL: process.env.API_BASE_URL,
      },
    },
  ],
});

