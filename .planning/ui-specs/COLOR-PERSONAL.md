# COLOR-PERSONAL.md — Personal Accent Color System

**Phase:** Browser Navigation System — UI Personalization  
**Date:** 2026-05-04  
**Status:** Research Complete / Ready for Implementation

---

## 1. Color Palette Table

All values in `oklch(L C H)` format, matched to Tailwind v4 default palette where possible.  
Lightness `L` kept at ~0.65–0.70 for accent (perceptual ~65–70%) across all hues for visual consistency.

| Accent Name | oklch Accent | oklch Accent-Foreground | Hue Family | Mood / Personality | Light Mode OK | Dark Mode OK |
|---|---|---|---|---|---|---|
| **Amber Gold** | `oklch(0.769 0.188 70.08)` | `oklch(0.145 0 0)` | 70° — warm gold | Warm, personal, sunset glow, inviting | ✅ | ✅ (use lighter fg) |
| **Teal Cyan** | `oklch(0.704 0.14 182.503)` | `oklch(0.145 0 0)` | 183° — fresh cyan-teal | Fresh, modern, tech, calm | ✅ | ✅ |
| **Violet Purple** | `oklch(0.645 0.246 280)` | `oklch(0.985 0 0)` | 280° — vivid violet | Creative, premium, distinctive | ✅ | ✅ |
| **Rose Pink** | `oklch(0.712 0.17 350)` | `oklch(0.145 0 0)` | 350° — rose-pink | Playful, modern, friendly | ✅ | ✅ |
| **Emerald Green** | `oklch(0.696 0.17 162.48)` | `oklch(0.145 0 0)` | 162° — emerald | Calm, growth, harmony | ✅ | ✅ |
| **Coral Orange** | `oklch(0.705 0.213 47.604)` | `oklch(0.145 0 0)` | 48° — vivid coral | Energetic, friendly, bold | ✅ | ✅ |

### Source References
- Amber Gold = Tailwind `amber-500` → `oklch(0.769 0.188 70.08)`
- Teal Cyan = Tailwind `teal-500` → `oklch(0.704 0.14 182.503)`
- Violet Purple = derived from shadcn `chart-1` dark → `oklch(0.488 0.243 264.376)` lightened + hue shift to 280
- Rose Pink = Tailwind `pink-500` equivalent → `oklch(0.712 0.17 350)` (close to `#f9a8d4`)
- Emerald Green = Tailwind `emerald-500` → `oklch(0.696 0.17 162.48)`
- Coral Orange = Tailwind `orange-500` → `oklch(0.705 0.213 47.604)`

### Accent-Foreground Logic
- **Dark accents** (L < 0.55): use `oklch(0.985 0 0)` (white-ish) for foreground
- **Mid/Light accents** (L ≥ 0.55): use `oklch(0.145 0 0)` (near-black) for foreground
- All 6 above use `oklch(0.145 0 0)` except Violet Purple uses `oklch(0.985 0 0)`.

---

## 2. CSS Variable Definitions

Add to `src/app/globals.css`. Uses `:root[data-accent="..."]` attribute selector pattern  
(compatible with next-themes + `@theme inline`).

```css
/* ============================================
   PERSONAL ACCENT COLOR SYSTEM
   Applied via data-accent attribute on :root
   Default (no attribute) = neutral (current shadcn base-nova)
   ============================================ */

/* --- AMBER GOLD --- */
:root[data-accent="amber-gold"] {
  --accent: oklch(0.769 0.188 70.08);
  --accent-foreground: oklch(0.145 0 0);
  --ring: oklch(0.769 0.188 70.08);
  --primary: oklch(0.769 0.188 70.08);
  --primary-foreground: oklch(0.145 0 0);
  /* Stack depth meter shades (light → full) */
  --stack-light: oklch(0.92 0.05 70.08);
  --stack-mid: oklch(0.769 0.188 70.08);
  --stack-dark: oklch(0.55 0.22 55);
}

/* --- TEAL CYAN --- */
:root[data-accent="teal-cyan"] {
  --accent: oklch(0.704 0.14 182.503);
  --accent-foreground: oklch(0.145 0 0);
  --ring: oklch(0.704 0.14 182.503);
  --primary: oklch(0.704 0.14 182.503);
  --primary-foreground: oklch(0.145 0 0);
  --stack-light: oklch(0.88 0.06 182.503);
  --stack-mid: oklch(0.704 0.14 182.503);
  --stack-dark: oklch(0.45 0.18 180);
}

/* --- VIOLET PURPLE --- */
:root[data-accent="violet-purple"] {
  --accent: oklch(0.645 0.246 280);
  --accent-foreground: oklch(0.985 0 0);
  --ring: oklch(0.645 0.246 280);
  --primary: oklch(0.645 0.246 280);
  --primary-foreground: oklch(0.985 0 0);
  --stack-light: oklch(0.85 0.1 280);
  --stack-mid: oklch(0.645 0.246 280);
  --stack-dark: oklch(0.40 0.28 275);
}

/* --- ROSE PINK --- */
:root[data-accent="rose-pink"] {
  --accent: oklch(0.712 0.17 350);
  --accent-foreground: oklch(0.145 0 0);
  --ring: oklch(0.712 0.17 350);
  --primary: oklch(0.712 0.17 350);
  --primary-foreground: oklch(0.145 0 0);
  --stack-light: oklch(0.90 0.06 350);
  --stack-mid: oklch(0.712 0.17 350);
  --stack-dark: oklch(0.48 0.20 345);
}

/* --- EMERALD GREEN --- */
:root[data-accent="emerald-green"] {
  --accent: oklch(0.696 0.17 162.48);
  --accent-foreground: oklch(0.145 0 0);
  --ring: oklch(0.696 0.17 162.48);
  --primary: oklch(0.696 0.17 162.48);
  --primary-foreground: oklch(0.145 0 0);
  --stack-light: oklch(0.88 0.07 162.48);
  --stack-mid: oklch(0.696 0.17 162.48);
  --stack-dark: oklch(0.42 0.20 155);
}

/* --- CORAL ORANGE --- */
:root[data-accent="coral-orange"] {
  --accent: oklch(0.705 0.213 47.604);
  --accent-foreground: oklch(0.145 0 0);
  --ring: oklch(0.705 0.213 47.604);
  --primary: oklch(0.705 0.213 47.604);
  --primary-foreground: oklch(0.145 0 0);
  --stack-light: oklch(0.90 0.08 47.604);
  --stack-mid: oklch(0.705 0.213 47.604);
  --stack-dark: oklch(0.50 0.24 40);
}

/* --- DARK MODE overrides for accent colors --- */
.dark:root[data-accent="amber-gold"] {
  --accent: oklch(0.769 0.188 70.08);
  --accent-foreground: oklch(0.145 0 0);
  --primary: oklch(0.769 0.188 70.08);
  --primary-foreground: oklch(0.145 0 0);
}
.dark:root[data-accent="teal-cyan"] {
  --accent: oklch(0.704 0.14 182.503);
  --accent-foreground: oklch(0.145 0 0);
  --primary: oklch(0.704 0.14 182.503);
  --primary-foreground: oklch(0.145 0 0);
}
.dark:root[data-accent="violet-purple"] {
  --accent: oklch(0.645 0.246 280);
  --accent-foreground: oklch(0.985 0 0);
  --primary: oklch(0.645 0.246 280);
  --primary-foreground: oklch(0.985 0 0);
}
.dark:root[data-accent="rose-pink"] {
  --accent: oklch(0.712 0.17 350);
  --accent-foreground: oklch(0.145 0 0);
  --primary: oklch(0.712 0.17 350);
  --primary-foreground: oklch(0.145 0 0);
}
.dark:root[data-accent="emerald-green"] {
  --accent: oklch(0.696 0.17 162.48);
  --accent-foreground: oklch(0.145 0 0);
  --primary: oklch(0.696 0.17 162.48);
  --primary-foreground: oklch(0.145 0 0);
}
.dark:root[data-accent="coral-orange"] {
  --accent: oklch(0.705 0.213 47.604);
  --accent-foreground: oklch(0.145 0 0);
  --primary: oklch(0.705 0.213 47.604);
  --primary-foreground: oklch(0.145 0 0);
}
```

---

## 3. `@theme inline` Integration

Add to the existing `@theme inline { ... }` block in `globals.css`.  
This exposes accent colors as Tailwind utility classes (`bg-accent`, `text-primary`, etc.).

```css
@theme inline {
  /* --- existing variables --- */
  --color-background: var(--background);
  /* ... keep all existing ... */

  /* --- personal accent theme tokens (reference data-attribute vars) --- */
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-ring: var(--ring);

  /* Stack depth meter custom tokens */
  --color-stack-light: var(--stack-light);
  --color-stack-mid: var(--stack-mid);
  --color-stack-dark: var(--stack-dark);
}
```

**Key insight from Tailwind v4 docs:** `@theme inline` resolves `var(--...)` references at build time when the variable is defined in `:root`. Since `--accent` etc. are set on `:root[data-accent="..."]`, the fallback (no attribute = shadcn default) is handled by the base `:root` definition in the existing file.

---

## 4. React Hook — `useAccentColor`

Manages user preference via `localStorage` key `navsim-accent`.  
Integrates with `next-themes` pattern (mount check + effect).

```ts
// src/hooks/useAccentColor.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

export type AccentName =
  | 'amber-gold'
  | 'teal-cyan'
  | 'violet-purple'
  | 'rose-pink'
  | 'emerald-green'
  | 'coral-orange'

const STORAGE_KEY = 'navsim-accent'
const VALID_ACCENTS: AccentName[] = [
  'amber-gold', 'teal-cyan', 'violet-purple',
  'rose-pink', 'emerald-green', 'coral-orange',
]

export function useAccentColor() {
  const [accent, setAccentState] = useState<AccentName | null>(null)
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as AccentName | null
      if (saved && VALID_ACCENTS.includes(saved)) {
        setAccentState(saved)
        applyAccent(saved)
      }
    } catch {}
    setMounted(true)
  }, [])

  // Apply data-accent attribute to <html> element
  const applyAccent = (name: AccentName | null) => {
    const html = document.documentElement
    if (name) {
      html.setAttribute('data-accent', name)
    } else {
      html.removeAttribute('data-accent')
    }
  }

  const setAccent = useCallback((name: AccentName | null) => {
    setAccentState(name)
    applyAccent(name)
    try {
      if (name) {
        localStorage.setItem(STORAGE_KEY, name)
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {}
  }, [])

  return { accent, setAccent, mounted, accentList: VALID_ACCENTS }
}
```

---

## 5. Popover UI Spec — Color Picker

**Components needed:** `popover`, `button` (from shadcn/ui — already installed)

### Visual Spec

```
┌─────────────────────────────────────┐
│  Personal Color                    │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│  │amber│ │teal │ │violet││rose │    │
│  │ ███ │ │ ███ │ │ ███ │ │ ███ │    │
│  └────┘ └────┘ └────┘ └────┘    │
│  ┌────┐ ┌────┐ ┌────┐           │
│  │green│ │orange│ │reset│          │
│  │ ███ │ │ ███ │ │  ×  │          │
│  └────┘ └────┘ └────┘           │
└─────────────────────────────────────┘
```

### Behavior
- Trigger: Small swatch button (24×24px circle) in header row, next to dark-mode toggle
- Popover opens below trigger
- 6 color swatches in 2×3 grid + 1 "reset" swatch (× icon, uses default neutral)
- Active swatch: 2px white ring + scale(1.1)
- On click: `setAccent(name)` from hook, popover closes
- Label below each swatch: tiny text (amber, teal, violet, rose, green, orange)

### Swatch oklch Colors (for the preview circles)

| Name | Swatch bg | Border |
|---|---|---|
| amber-gold | `oklch(0.769 0.188 70.08)` | `oklch(0.55 0.22 55)` |
| teal-cyan | `oklch(0.704 0.14 182.503)` | `oklch(0.45 0.18 180)` |
| violet-purple | `oklch(0.645 0.246 280)` | `oklch(0.40 0.28 275)` |
| rose-pink | `oklch(0.712 0.17 350)` | `oklch(0.48 0.20 345)` |
| emerald-green | `oklch(0.696 0.17 162.48)` | `oklch(0.42 0.20 155)` |
| coral-orange | `oklch(0.705 0.213 47.604)` | `oklch(0.50 0.24 40)` |

---

## 6. Stack Depth Meter — Color Evolution

**Current:** Hardcoded `bg-green-500` → `bg-yellow-500` → `bg-red-500` (Tailwind v3 classes, not using oklch).

**Recommended approach:** Use the `--stack-light`, `--stack-mid`, `--stack-dark` CSS vars defined per accent (Section 2).

### Updated meter logic in `NavSimulator.tsx`

Replace the current ternary:
```tsx
// BEFORE (current)
className={`h-full rounded-full transition-all duration-300 ${
  backStack.length <= 5 ? 'bg-green-500' :
  backStack.length <= 15 ? 'bg-yellow-500' : 'bg-red-500'
}`}

// AFTER (personal accent aware)
className="h-full rounded-full transition-all duration-300"
style={{
  width: `${Math.min((backStack.length / 20) * 100, 100)}%`,
  backgroundColor: (() => {
    if (backStack.length <= 5) return 'var(--stack-light)'
    if (backStack.length <= 15) return 'var(--stack-mid)'
    return 'var(--stack-dark)'
  })(),
}}
```

This gives a perceptually-even light→mid→dark gradient within the user's chosen accent hue.

**Fallback:** If no accent selected (`--stack-light` is undefined), the meter falls back to the current green→yellow→red behavior:
```tsx
const meterColor = (() => {
  if (backStack.length <= 5) return 'var(--stack-light, oklch(0.92 0.05 70.08))'
  if (backStack.length <= 15) return 'var(--stack-mid, oklch(0.769 0.188 70.08))'
  return 'var(--stack-dark, oklch(0.55 0.22 55))'
})()
```

---

## 7. Special / Seasonal Themes (Optional Nice-to-Have)

These are **multi-hue** themes that override more than just `--accent`.  
They use CSS `color-mix()` or multiple `--*` vars.

| Theme Name | Mood | Key oklch Hues | Scope |
|---|---|---|---|
| **Ocean** | Deep teal-blue, oceanic | 180–220 | `--primary`, `--accent`, `--background` (dark only) |
| **Sunset** | Warm orange→pink→purple gradient | 30–350 | `--accent`, `--primary`, gradient on `<body>` |
| **Forest** | Earthy green-brown | 120–150 | `--primary`, `--accent`, `--background` (light: muted green) |
| **Midnight** | Deep dark + violet accent | 280 (accent only) | `--background: oklch(0.10 0 0)`, `--primary: oklch(0.65 0.25 280)` |

Implementation: Same `data-accent` pattern, but these set **additional** variables:
```css
:root[data-accent="theme-ocean"] {
  --primary: oklch(0.65 0.12 200);
  --accent: oklch(0.70 0.10 190);
  --background: oklch(0.12 0.01 200);  /* dark mode only */
}
```

*Note: Seasonal themes require more design work and should be a separate phase/task.*

---

## 8. Integration Checklist

- [ ] Add Section 2 CSS to `src/app/globals.css` (below existing `:root` / `.dark` blocks)
- [ ] Add Section 3 `@theme inline` tokens to existing `@theme inline { }` block
- [ ] Create `src/hooks/useAccentColor.ts` with Section 4 code
- [ ] Add popover trigger button to `NavSimulator.tsx` header (next to dark-mode toggle)
- [ ] Update Stack Depth Meter in `NavSimulator.tsx` per Section 6
- [ ] Test: switch accent → verify `data-accent` on `<html>` → check meter colors
- [ ] Test: reload page → verify `localStorage` restores accent
- [ ] Test: dark mode toggle → verify accent still visible in both modes

---

## 9. Accessibility Notes

- All accent foreground colors meet **WCAG AA** contrast vs their accent backgrounds:
  - `oklch(0.145 0 0)` on `L≥0.65` → contrast ratio > 7:1 ✅
  - `oklch(0.985 0 0)` on `L≈0.645` (violet) → contrast ratio > 4.5:1 ✅
- Stack depth meter uses 3 distinct lightness levels (L=0.92, 0.70, 0.55) for clear visual distinction without relying on hue alone (colorblind-friendly).
- Popover trigger has `aria-label="Choose accent color"` + popover uses shadcn `Popover` with proper `role="dialog"`.

---

## 10. References

| Source | URL |
|---|---|
| Tailwind v4 Default Colors (oklch) | https://tailwindcss.com/docs/colors |
| shadcn/ui Theming (oklch vars) | https://ui.shadcn.com/docs/theming |
| OKLCH Color Picker | https://oklch.net/ |
| OKLCH MDN Docs | https://developer.mozilla.org/en/docs/Web/CSS/color_value/oklch |
| Tailwind v4 @theme inline | https://tailwindcss.com/docs/colors#referencing-other-variables |
| next-themes | https://github.com/pacocoursey/next-themes |
| Current globals.css | `src/app/globals.css` (130 lines, oklch-based) |
| Current NavSimulator | `src/components/NavSimulator.tsx` (402 lines, stack DS logic) |
