import { defineConfig } from 'vite';
import * as dotenv from 'dotenv';
dotenv.config();
import react from '@vitejs/plugin-react';



const config = defineConfig({
  server: { host: '0.0.0.0' },
  plugins: [
    react(),
  ],
})

export default config;
