import axios from 'axios';

type ApiErrorBody = {
  message?: string;
  errors?: Record<string, string[]>; // format validasi Laravel
};

/**
 * Mengambil pesan error yang ramah dari error axios.
 * Urutan: error validasi Laravel -> message dari server -> fallback.
 */
export function getErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return 'Tidak dapat terhubung ke server. Pastikan backend sudah berjalan.';
    }
    const data = err.response.data as ApiErrorBody | undefined;
    const firstValidation = data?.errors ? Object.values(data.errors)[0]?.[0] : undefined;
    return firstValidation || data?.message || fallback;
  }
  return fallback;
}
