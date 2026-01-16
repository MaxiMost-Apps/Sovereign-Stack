// This file centralizes all API communication.

const getApiBaseUrl = () => {
  // Get the API URL from environment variables, which is set by Vercel.
  // The VITE_ prefix is necessary for Vite to expose it to the frontend code.
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  if (!apiUrl) {
    throw new Error('VITE_API_BASE_URL is not defined. Please set it in your .env file or Vercel environment variables.');
  }
  return apiUrl;
};

const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${getApiBaseUrl()}${endpoint}`;
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
