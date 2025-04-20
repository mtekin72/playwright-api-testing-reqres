import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

export default defineConfig({
  tsconfig: "./tsconfig.json",
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: "html",
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
        baseURL: process.env.API_BASE_URL, // 👈 use from .env
      },
    },
  ],
});
