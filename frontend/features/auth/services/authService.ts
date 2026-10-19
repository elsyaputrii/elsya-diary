import { apiClient } from '@/services/api';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

/** Backend bisa membalas { token } atau { data: { token } } -> dua-duanya didukung. */
function extractToken(body: { token?: string; data?: { token?: string } }): string | null {
  return body.token ?? body.data?.token ?? null;
}

export async function login(input: LoginInput): Promise<string | null> {
  const res = await apiClient.post('/login', input);
  return extractToken(res.data);
}

/** Mengembalikan token jika backend langsung me-login-kan user setelah register, kalau tidak null. */
export async function register(input: RegisterInput): Promise<string | null> {
  const res = await apiClient.post('/register', {
    name: input.name,
    email: input.email,
    password: input.password,
    password_confirmation: input.passwordConfirmation,
  });
  return extractToken(res.data);
}

export async function logout(): Promise<void> {
  await apiClient.post('/logout');
}
