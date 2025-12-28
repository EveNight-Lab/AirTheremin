/**
 * Vite SSR 설정
 * SEO 및 애드센스 크롤링을 위한 서버 사이드 렌더링 설정
 * 
 * 참고: 실제 SSR 구현을 위해서는 별도의 서버 설정이 필요합니다.
 * 이 파일은 SSR 구조를 위한 참고용입니다.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    // SSG를 위한 정적 페이지 생성 설정
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  ssr: {
    // SSR을 위한 설정
    noExternal: ['react', 'react-dom', 'react-router-dom'],
  },
})

