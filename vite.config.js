import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // Permite acceso desde cualquier IP en tu red
    port: 5173,      // Puerto (opcional, es el predeterminado)
    strictPort: true // Falla si el puerto está ocupado (opcional)
  }
})