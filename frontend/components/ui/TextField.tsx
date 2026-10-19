'use client';

import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FormField from './FormField';
import { inputClass, inputErrorClass } from './styles';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  error?: string;
  icon?: LucideIcon;
}

/**
 * Input teks lengkap: label + ikon + pesan error.
 * Kalau type="password", otomatis ada tombol tampil/sembunyikan password.
 */
export default function TextField({ label, error, icon: Icon, type = 'text', className = '', ...rest }: Props) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <FormField id={id} label={label} error={error}>
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-muted">
            <Icon className="w-5 h-5" />
          </span>
        )}
        <input
          id={id}
          type={isPassword && showPassword ? 'text' : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputClass} ${Icon ? 'pl-12' : ''} ${isPassword ? 'pr-12' : ''} ${error ? inputErrorClass : ''} ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-ink-muted hover:text-ink"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </FormField>
  );
}
