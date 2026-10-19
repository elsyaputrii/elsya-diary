import { apiClient } from '@/services/api';

export interface ProfileData {
  name: string;
  email: string;
}

export async function getProfile(): Promise<ProfileData> {
  const res = await apiClient.get('/user');
  const data = res.data.data || res.data;
  return { name: data.name, email: data.email };
}

export async function updateProfile(input: ProfileData): Promise<ProfileData> {
  const res = await apiClient.put('/user/profile', input);
  const data = res.data.data || res.data;
  return { name: data.name ?? input.name, email: data.email ?? input.email };
}
