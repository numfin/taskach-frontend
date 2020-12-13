const env = (import.meta as { env: Record<string, string> }).env;

export const API_HOST = env.VITE_API_HOST;
