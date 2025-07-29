"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WebsiteLanguageContextType {
  websiteLanguage: string;
  setWebsiteLanguage: (language: string) => void;
}

const WebsiteLanguageContext = createContext<WebsiteLanguageContextType | undefined>(undefined);

export function WebsiteLanguageProvider({ children }: { children: React.ReactNode }) {
  const [websiteLanguage, setWebsiteLanguageState] = useState("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('website-language');
    if (savedLanguage) {
      setWebsiteLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setWebsiteLanguage = (language: string) => {
    setWebsiteLanguageState(language);
    localStorage.setItem('website-language', language);
  };

  return (
    <WebsiteLanguageContext.Provider value={{ websiteLanguage, setWebsiteLanguage }}>
      {children}
    </WebsiteLanguageContext.Provider>
  );
}

export function useWebsiteLanguage() {
  const context = useContext(WebsiteLanguageContext);
  if (context === undefined) {
    throw new Error('useWebsiteLanguage must be used within a WebsiteLanguageProvider');
  }
  return context;
}