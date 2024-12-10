import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  include: ['firebase/compat/app', 'firebase/compat/auth', 'firebase/compat/firestore'],
},
)
