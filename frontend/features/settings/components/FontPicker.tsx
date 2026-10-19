'use client';

import { Check } from 'lucide-react';
import { FONTS, FontName } from '../constants';

/** Setiap kartu memakai font-nya sendiri sebagai contoh, lewat variabel next/font. */
const FONT_FAMILY: Record<FontName, string> = {
  poppins: 'var(--font-poppins), system-ui, sans-serif',
  nunito: 'var(--font-nunito), system-ui, sans-serif',
  playfair: 'var(--font-playfair), Georgia, serif',
};

interface Props {
  value: FontName;
  onChange: (font: FontName) => void;
}

export default function FontPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="Pilih jenis font">
      {FONTS.map((font) => {
        const selected = value === font.value;
        return (
          <button
            key={font.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(font.value)}
            className={`text-left rounded-2xl border-2 p-4 transition flex items-center justify-between gap-4 ${
              selected ? 'border-primary bg-accent-soft' : 'border-line hover:bg-hover'
            }`}
          >
            <div style={{ fontFamily: FONT_FAMILY[font.value] }}>
              <p className="text-base font-semibold text-ink">{font.label}</p>
              <p className="text-sm text-ink-soft">Hari ini aku belajar menikmati hal-hal kecil.</p>
              <p className="text-xs text-ink-muted mt-1">{font.description}</p>
            </div>
            {selected && <Check className="w-5 h-5 text-primary shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}
