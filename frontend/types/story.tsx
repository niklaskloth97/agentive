// Story type definitions based on the JSON structure

export interface StoryPage {
  text: string;
  imageUrl: string;
  audioUrl: string;
}

export interface StoryLanguageData {
  title: string;
  titlePicture: string;
  fullAudio: string;
  fullText: string;
  pages: Record<string, StoryPage>;
}

export interface Story {
  id: string;
  slug: string;
  en?: StoryLanguageData[];
  de?: StoryLanguageData[];
  deshort?: StoryLanguageData[];
  es?: StoryLanguageData[];
  it?: StoryLanguageData[];
  lux?: StoryLanguageData[];
  gr?: StoryLanguageData[];
  sv?: StoryLanguageData[];
  al?: StoryLanguageData[];
  fr?: StoryLanguageData[];
  ukr?: StoryLanguageData[];
  pl?: StoryLanguageData[];
  tur?: StoryLanguageData[];
  pt?: StoryLanguageData[];
  slo?: StoryLanguageData[];
  [key: string]: string | StoryLanguageData[] | undefined;
}

// Helper type for simplified story representation in components
export interface SimpleStory {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
}

// Helper functions that can be reused across components
export const getStoryTitle = (story: Story, language?: string): string => {
  // Map website language codes to story language codes
  const languageMap: { [key: string]: string } = {
    'en': 'en',
    'de': 'de',
    'fr': 'fr',
    'it': 'it',
    'sv': 'sv',
    'lux': 'lux',
    'gr': 'gr',
    'es': 'es',
    'al': 'al',
    'ukr': 'ukr',
    'pl': 'pl',
    'tur': 'tur',
    'pt': 'pt',
    'slo': 'slo'
  };

  // If language is provided, try to get title in that language first
  if (language) {
    const storyLangCode = languageMap[language] || language;
    const languageData = story[storyLangCode];
    if (Array.isArray(languageData) && languageData.length > 0 && languageData[0].title) {
      return languageData[0].title;
    }
    
    // Also try with 'de-short' variant for German
    if (language === 'de') {
      const deShortData = story['de-short'] || story['deshort'];
      if (Array.isArray(deShortData) && deShortData.length > 0 && deShortData[0].title) {
        return deShortData[0].title;
      }
    }
  }
  
  // Fallback to English if language not found or not provided
  const englishData = story.en;
  if (Array.isArray(englishData) && englishData.length > 0 && englishData[0].title) {
    return englishData[0].title;
  }
  
  // Try other languages as final fallback
  for (const [key, value] of Object.entries(story)) {
    if (key !== 'id' && key !== 'slug' && Array.isArray(value) && value.length > 0) {
      const langData = value[0] as StoryLanguageData;
      if (langData.title) {
        return langData.title;
      }
    }
  }
  
  return `Story ${story.id}`;
};

export const getStoryCoverImage = (story: Story, language?: string): string => {
  // Map website language codes to story language codes
  const languageMap: { [key: string]: string } = {
    'en': 'en',
    'de': 'de',
    'fr': 'fr',
    'it': 'it',
    'sv': 'sv',
    'lux': 'lux',
    'gr': 'gr',
    'es': 'es',
    'al': 'al',
    'ukr': 'ukr',
    'pl': 'pl',
    'tur': 'tur',
    'pt': 'pt',
    'slo': 'slo'
  };

  // If language is provided, try to get cover image in that language first
  if (language) {
    const storyLangCode = languageMap[language] || language;
    const languageData = story[storyLangCode];
    if (Array.isArray(languageData) && languageData.length > 0) {
      const langData = languageData[0];
      // Try titlePicture first
      if (langData.titlePicture) {
        return langData.titlePicture;
      }
      // Fallback to first page image if titlePicture not available
      if (langData.pages && langData.pages["0"] && langData.pages["0"].imageUrl) {
        return langData.pages["0"].imageUrl;
      }
      if (langData.pages && langData.pages["1"] && langData.pages["1"].imageUrl) {
        return langData.pages["1"].imageUrl;
      }
    }
    
    // Also try with 'de-short' variant for German
    if (language === 'de') {
      const deShortData = story['de-short'] || story['deshort'];
      if (Array.isArray(deShortData) && deShortData.length > 0) {
        const langData = deShortData[0];
        if (langData.titlePicture) {
          return langData.titlePicture;
        }
        if (langData.pages && langData.pages["0"] && langData.pages["0"].imageUrl) {
          return langData.pages["0"].imageUrl;
        }
        if (langData.pages && langData.pages["1"] && langData.pages["1"].imageUrl) {
          return langData.pages["1"].imageUrl;
        }
      }
    }
  }
  
  // Fallback to English if language not found or not provided
  const englishData = story.en;
  if (Array.isArray(englishData) && englishData.length > 0) {
    const langData = englishData[0];
    if (langData.titlePicture) {
      return langData.titlePicture;
    }
    // Fallback to first page image if titlePicture not available
    if (langData.pages && langData.pages["0"] && langData.pages["0"].imageUrl) {
      return langData.pages["0"].imageUrl;
    }
    if (langData.pages && langData.pages["1"] && langData.pages["1"].imageUrl) {
      return langData.pages["1"].imageUrl;
    }
  }
  
  // Try other languages as final fallback
  for (const [key, value] of Object.entries(story)) {
    if (key !== 'id' && key !== 'slug' && Array.isArray(value) && value.length > 0) {
      const langData = value[0] as StoryLanguageData;
      if (langData.titlePicture) {
        return langData.titlePicture;
      }
      // Fallback to first page image
      if (langData.pages && langData.pages["0"] && langData.pages["0"].imageUrl) {
        return langData.pages["0"].imageUrl;
      }
      if (langData.pages && langData.pages["1"] && langData.pages["1"].imageUrl) {
        return langData.pages["1"].imageUrl;
      }
    }
  }
  
  // Final fallback image
  return '/images/story-placeholder.jpg';
};

export const getStoryLanguages = (story: Story): string[] => {
  const languages: string[] = [];
  Object.keys(story).forEach(key => {
    if (key !== 'id' && key !== 'slug' && Array.isArray(story[key]) && (story[key] as StoryLanguageData[]).length > 0) {
      switch(key) {
        case 'en': languages.push('English'); break;
        case 'de': languages.push('German'); break;
        case 'de-short': languages.push('German (Short)'); break;
        case 'fr': languages.push('French'); break;
        case 'es': languages.push('Spanish'); break;
        case 'it': languages.push('Italian'); break;
        case 'lux': languages.push('Luxembourgish'); break;
        case 'gr': languages.push('Greek'); break;
        case 'sv': languages.push('Slovenian'); break;
        case 'al': languages.push('Albanian'); break;
        case 'ukr': languages.push('Ukrainian'); break;
        case 'pl': languages.push('Polish'); break;
        case 'tur': languages.push('Turkish'); break;
        case 'pt': languages.push('Portuguese'); break;
        case 'slo': languages.push('Slovenian'); break;
        default: languages.push(key.toUpperCase());
      }
    }
  });
  return languages.length > 0 ? languages : ['English'];
};