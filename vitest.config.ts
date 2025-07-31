/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'istanbul'
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts'
  },
})