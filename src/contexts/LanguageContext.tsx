import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Language } from '../types';

type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isReady: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<Language, Translations> | null>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const [enRes, hiRes] = await Promise.all([
          fetch('/locales/en.json'),
          fetch('/locales/hi.json')
        ]);
        if (!enRes.ok || !hiRes.ok) {
            throw new Error('Failed to fetch translation files');
        }
        const en = await enRes.json();
        const hi = await hiRes.json();
        setTranslations({ en, hi });
      } catch (error) {
        console.error("Failed to load translation files:", error);
        // Fallback to prevent app crash
        setTranslations({ en: {}, hi: {} });
      }
    };
    fetchTranslations();
  }, []);

  const t = useCallback((key: string): string => {
    // Fallback to the key itself if translations are not ready or the key is missing
    return translations?.[language]?.[key] || key;
  }, [language, translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isReady: !!translations }}>
      {children}
    </LanguageContext.Provider>
  );
};