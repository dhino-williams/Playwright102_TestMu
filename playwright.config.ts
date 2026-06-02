// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }]], // Generates the report folder
  use: {
    video: 'on',         // Generates video files
    screenshot: 'on',    // Generates screenshot files
    trace: 'on',         // Generates trace files
  },
});