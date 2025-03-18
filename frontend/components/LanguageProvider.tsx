"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface LanguageContextType {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  availableLanguages: { [key: string]: { label: string } };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  defaultLanguage = "en",
  availableLanguages
}: { 
  children: ReactNode;
  defaultLanguage?: string;
  availableLanguages: { [key: string]: { label: string } };
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  return (
    <LanguageContext.Provider value={{ 
      selectedLanguage, 
      setSelectedLanguage,
      availableLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}