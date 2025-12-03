// Removed reference to vite/client to fix "Cannot find type definition file" error
// /// <reference types="vite/client" />

// Fix for "Cannot find name 'process'" error
// We augment the existing NodeJS.ProcessEnv interface instead of redeclaring 'process' 
// to avoid conflicts with @types/node.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY?: string;
    [key: string]: string | undefined;
  }
}

// Fallback module declarations to fix "Cannot find module" errors
// if packages are missing types or not properly resolved
declare module 'openai' {
  const OpenAI: any;
  export default OpenAI;
}

declare module '@google/genai' {
  export const GoogleGenAI: any;
  export const Type: any;
}