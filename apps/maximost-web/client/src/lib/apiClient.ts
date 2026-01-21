// This file centralizes all API communication.

const getApiBaseUrl = () => {
  // FORCE CONNECTION TO RENDER
  // We are bypassing environment variables to ensure the frontend talks to the correct backend.
  const API_BASE_URL = 'https://sovereign-stack.onrender.com';
  return API_BASE_URL;
};

const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    // Safety: Ensure endpoint has leading slash
    const safeEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${getApiBaseUrl()}${safeEndpoint}`;
    const token = localStorage.getItem('token');

    const headers = new Headers(options.headers || {});
    headers.append('Content-Type', 'application/json');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        // Try to parse the error message from the backend
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || 'An error occurred');
      }
      // If the response is 204 No Content, there's no body to parse
      if (response.status === 204) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error(`API Client Error (${options.method || 'GET'} ${url}):`, error);
      throw error;
    }
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint: string, body: any) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  },

  put(endpoint: string, body: any) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  },

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

export default apiClient;
