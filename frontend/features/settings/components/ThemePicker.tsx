'use client';

import { Check } from 'lucide-react';
import { THEMES, ThemeName } from '../constants';

/** Warna contoh untuk kartu pratinjau (sengaja ditulis tetap, tidak ikut tema aktif). */
const PREVIEW: Record<ThemeName, { bg: string; card: string; accent: string }> = {
  light: { bg: '#fdfbf7', card: '#fffdf9', accent: '#7d5a50' },
  dark: { bg: '#1a1614', card: '#241f1c', accent: '#d9a18f' },
  pastel: { bg: '#fff5f9', card: '#ffffff', accent: '#8f5fb8' },
};

interface Props {
  value: ThemeName;
  onChange: (theme: ThemeName) => void;
}

export default function ThemePicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Pilih tema">
      {THEMES.map((theme) => {
        const selected = value === theme.value;
        const p = PREVIEW[theme.value];
        return (
          <button
            key={theme.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(theme.value)}
            className={`text-left rounded-2xl border-2 p-3 transition ${
              selected ? 'border-primary bg-accent-soft' : 'border-line hover:bg-hover'
            }`}
          >
            {/* Pratinjau mini */}
            <div className="rounded-xl p-3 mb-3 border border-black/5" style={{ background: p.bg }}>
              <div className="rounded-lg p-2 space-y-1.5" style={{ background: p.card }}>
                <div className="h-2 w-2/3 rounded-full" style={{ background: p.accent }} />
                <div className="h-1.5 w-full rounded-full opacity-30" style={{ background: p.accent }} />
                <div className="h-1.5 w-4/5 rounded-full opacity-30" style={{ background: p.accent }} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">{theme.label}</p>
                <p className="text-xs text-ink-muted">{theme.description}</p>
              </div>
              {selected && <Check className="w-4 h-4 text-primary shrink-0" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
