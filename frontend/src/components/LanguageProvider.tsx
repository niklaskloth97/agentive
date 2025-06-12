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
  availableLanguages,
  onLanguageChange
}: { 
  children: ReactNode;
  defaultLanguage?: string;
  availableLanguages: { [key: string]: { label: string } };
  onLanguageChange?: (language: string) => void;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  // Custom handler for language changes that calls the callback
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      selectedLanguage, 
      setSelectedLanguage: handleLanguageChange,
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