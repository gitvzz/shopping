/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Automatically read from package.json version field
   */
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_BUILD_EPOCH?: string
  readonly VITE_CONFIG_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
