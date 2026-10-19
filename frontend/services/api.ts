import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Login/Register yang salah juga bisa membalas 401. Jangan redirect di sini,
    // supaya pesan error tetap tampil di form (bukan halaman ter-reload).
    const url = error.config?.url ?? '';
    const isAuthRequest = url.includes('/login') || url.includes('/register');

    if (error.response?.status === 401 && !isAuthRequest && typeof window !== 'undefined') {
      sessionStorage.removeItem('auth_token');
      // File ini bukan komponen React, jadi useRouter/redirect tidak bisa dipakai.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);