import { useState, useEffect } from 'react';

// Translation data based on your CSV
const translations: Record<string, Record<string, string>> = {
  'multilingual-ressources': {
    'English': 'Multilingual Resources',
    'French': 'Ressources Multilingues', 
    'Lux': 'Multilingual Ressourcen',
    'Slovenian': 'Večjezična gradiva',
    'Italian': '',
    'German': 'Mehrsprachige Materialien',
    'Greek': 'Πολυγλωσσικές πηγές'
  },
  'storytime': {
    'English': 'Storytime',
    'French': 'Heure des Histoires',
    'Lux': 'Storytime',
    'Slovenian': 'Zgodbe / Storytime',
    'Italian': '',
    'German': 'Geschichte',
    'Greek': 'Η ιστορία μας'
  },
  'activities': {
    'English': 'Activities',
    'French': 'Activités',
    'Lux': 'Aktivitéiten',
    'Slovenian': 'Dejavnosti',
    'Italian': '',
    'German': 'Aktivitäten',
    'Greek': 'Δραστηριότητες'
  },
  'about-agentive': {
    'English': 'About AGENTIVE',
    'French': 'À propos d\'AGENTIVE',
    'Lux': 'À propos AGENTIVE',
    'Slovenian': 'O projektu (AGENTIVE)',
    'Italian': '',
    'German': 'Über Agentive',
    'Greek': 'Σχετικά με το AGENTIVE'
  },
  'team': {
    'English': 'The Team',
    'French': 'L\'Équipe',
    'Lux': 'Eist Team',
    'Slovenian': 'Projektna skupina',
    'Italian': '',
    'German': 'Team',
    'Greek': 'Η ομάδα'
  },
  'blog': {
    'English': 'Blog',
    'French': 'Blog',
    'Lux': 'Blog',
    'Slovenian': 'Blog',
    'Italian': '',
    'German': 'Blog',
    'Greek': 'Το blog'
  }
};

// Available languages mapping
const availableLanguages = {
  'en': 'English',
  'fr': 'French', 
  'lux': 'Lux',
  'sv': 'Slovenian',
  'it': 'Italian',
  'de': 'German',
  'gr': 'Greek'
};

export const useTranslation = (currentLanguage: string = 'en') => {
  const translate = (key: string): string => {
    const languageName = availableLanguages[currentLanguage as keyof typeof availableLanguages] || 'English';
    const translation = translations[key]?.[languageName];
    
    // Fallback to English if translation not found or empty
    if (!translation || translation.trim() === '') {
      return translations[key]?.['English'] || key;
    }
    
    return translation;
  };

  return { translate, availableLanguages };
};