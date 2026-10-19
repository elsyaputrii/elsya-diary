import { isValidEmail } from '@/features/auth/validation';
import type { ProfileData } from './services/profileService';

export type ProfileErrors = Partial<Record<keyof ProfileData, string>>;

export function validateProfile(values: ProfileData): ProfileErrors {
  const errors: ProfileErrors = {};

  if (!values.name.trim()) errors.name = 'Nama wajib diisi.';
  else if (values.name.trim().length < 2) errors.name = 'Nama minimal 2 karakter.';

  if (!values.email.trim()) errors.email = 'Email wajib diisi.';
  else if (!isValidEmail(values.email)) errors.email = 'Format email tidak valid.';

  return errors;
}
