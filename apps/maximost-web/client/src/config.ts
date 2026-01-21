// Centralized Configuration for Maximost Web
// Source of Truth for API endpoints and environment variables

// Use Environment Variable if available (Vercel), otherwise fallback to Production URL
export const API_BASE_URL = "https://sovereign-stack.onrender.com";

// Safety: Ensure no trailing slash
export const getApiUrl = (endpoint: string) => {
    const base = API_BASE_URL.replace(/\/$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
};
