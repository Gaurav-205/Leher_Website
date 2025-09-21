/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Node.js process types for development
declare const process: {
  env: {
    NODE_ENV: 'development' | 'production' | 'test'
    [key: string]: string | undefined
  }
}

// Google Analytics gtag function
declare function gtag(...args: any[]): void


