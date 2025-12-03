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
