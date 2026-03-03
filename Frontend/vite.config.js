import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
    },
    build: {
        // Set the base path for production deployment
        // Use VITE_BASE_URL env var or default to /
        base: process.env.VITE_BASE_URL || '/',
    },
    // Ensure environment variables starting with VITE_ are exposed
    envPrefix: 'VITE_',
})
