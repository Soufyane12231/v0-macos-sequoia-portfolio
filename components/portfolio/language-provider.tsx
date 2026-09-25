'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Lang } from '@/lib/portfolio-data'

const STORAGE_KEY = 'soufyaneos:lang'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // French is the default: it matches the CV and the primary audience
  // (Moroccan / francophone recruiters). English is opt-in.
  const [lang, setLangState] = useState<Lang>('fr')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'fr' || stored === 'en') {
        setLangState(stored)
      }
    } catch {
      /* localStorage unavailable — keep the default language */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore persistence errors */
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const next: Lang = current === 'fr' ? 'en' : 'fr'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore persistence errors */
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ lang, setLang, toggleLang }), [lang, setLang, toggleLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside <LanguageProvider>')
  }
  return context
}
