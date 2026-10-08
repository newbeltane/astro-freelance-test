
/// <reference types="vite/client" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Define your custom environment variables here
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  // add more env variables as needed...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}