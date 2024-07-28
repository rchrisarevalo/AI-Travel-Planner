import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '../.env',
  envPrefix: '_',
  env: dotenv.config({path: './.env'})
})
