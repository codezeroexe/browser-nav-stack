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
