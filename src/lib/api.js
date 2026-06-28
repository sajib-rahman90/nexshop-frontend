import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  // NOTE: withCredentials removed — it caused CORS preflight failures
  // because the backend does not echo the correct Access-Control-Allow-Credentials header.
});

// Attach Firebase ID token if the user is signed in
api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    try {
      // Dynamically import to avoid SSR issues
      const { auth } = await import('@/lib/firebase');
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Firebase not ready or user not signed in — continue without token
    }
  }
  return config;
});

// Handle global API errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[API Error]', err.response?.status, err.config?.url, err.message);
    }
    return Promise.reject(err);
  }
);
