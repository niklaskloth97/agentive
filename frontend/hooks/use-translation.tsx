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
  'pedagogical-guide': {
  'English': 'Pedagogical Guide',
  'French': 'Guide pédagogique',
  'Lux': 'Pädagogesche Guide',
  'Slovenian': 'Pedagoški vodnik',
  'Italian': 'Guida pedagogica',
  'German': 'Pädagogischer Leitfaden',
  'Greek': 'Παιδαγωγικός οδηγός'
},
  'multilingual-stories': {
    'English': 'Multilingual Stories',
    'French': 'Histoires Multilingues',
    'Lux': 'Méisproocheg Geschichten',
    'Slovenian': 'Večjezične zgodbe',
    'Italian': 'Storie Multilingue',
    'German': 'Mehrsprachige Geschichten',
    'Greek': 'Πολυγλωσσικές ιστορίες'
  },
  'story-details': {
    'English': 'Story Details',
    'French': 'Détails de l\'Histoire',
    'Lux': 'Geschichts-Detailer',
    'Slovenian': 'Podrobnosti zgodbe',
    'Italian': 'Dettagli della Storia',
    'German': 'Geschichtsdetails',
    'Greek': 'Λεπτομέρειες ιστορίας'
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
  },
  'dashboard': {
    'English': 'Dashboard',
    'French': 'Espace d\'Apprentissage',
    'Lux': 'Dashboard',
    'Slovenian': 'Nadzorna plošča',
    'Italian': '',
    'German': 'Dashboard',
    'Greek': 'Ταμπλό'
  },
  'overview': {
    'English': 'Overview',
    'French': 'Aperçu',
    'Lux': 'Iwwerbléck',
    'Slovenian': 'Pregled',
    'Italian': '',
    'German': 'Übersicht',
    'Greek': 'Επισκόπηση'
  },
  'listen-n-watch': {
    'English': 'Listen and Watch',
    'French': 'Écouter et Regarder',
    'Lux': 'Lauschteren a Kucken',
    'Slovenian': 'Poslušaj in glej',
    'Italian': '',
    'German': 'Hören & Anschauen',
    'Greek': 'Άκουσε και Δες'
  },
  'read': {
    'English': 'Read',
    'French': 'Lire',
    'Lux': 'Liesen',
    'Slovenian': 'Preberi',
    'Italian': '',
    'German': 'Lesen',
    'Greek': 'Διάβασε'
  },
  'available': {
    'English': 'Available in',
    'French': 'Disponible en',
    'Lux': 'Verfügbar op',
    'Slovenian': 'Na voljo v',
    'Italian': '',
    'German': 'Verfügbar in',
    'Greek': 'Διαθέσιμο σε'
  },
  'stories': {
    'English': 'Stories',
    'French': 'Histoires',
    'Lux': 'Geschichten',
    'Slovenian': 'Zgodbe',
    'Italian': '',
    'German': 'Geschichten',
    'Greek': 'Ιστορίες'
  },
  'select-lang': {
    'English': 'Select a Language',
    'French': 'Choisissez une langue',
    'Lux': 'Sprooch auswielen',
    'Slovenian': 'Izberi jezik',
    'Italian': '',
    'German': 'Wähle eine Sprache',
    'Greek': 'Επιλέξτε μια γλώσσα'
  },
  'select-lang-long': {
    'English': 'Please choose a language to view this story',
    'French': '/',
    'Lux': '/',
    'Slovenian': 'Izberi jezik zgodbe',
    'Italian': '',
    'German': 'Wähle eine Sprache aus, um diese Geschichte zu lesen',
    'Greek': 'Παρακαλώ επιλέξτε μια γλώσσα για να δείτε την ιστορία'
  },
  'download': {
    'English': 'Download',
    'French': 'Télécharger',
    'Lux': 'Download',
    'Slovenian': 'Prenesi',
    'Italian': '',
    'German': 'Herunterladen',
    'Greek': 'Λήψη'
  },
  'audio': {
    'English': 'Audio',
    'French': 'Audio',
    'Lux': 'Audio',
    'Slovenian': 'Avdio',
    'Italian': '',
    'German': 'Audio',
    'Greek': 'Ακουστικό υλικό'
  },
  'text': {
    'English': 'Text',
    'French': 'Texte',
    'Lux': 'Text',
    'Slovenian': 'Besedilo',
    'Italian': '',
    'German': 'Text',
    'Greek': 'Κείμνο'
  },
  'picture': {
    'English': 'Pictures',
    'French': 'Images',
    'Lux': 'Biller',
    'Slovenian': 'Slike',
    'Italian': '',
    'German': 'Bilder',
    'Greek': 'Εικόνες'
  },
  'story-guide': {
    'English': 'Story\'s reading Guide - this is the specific guide for each story which has questions teachers can answer',
    'French': 'Lecture de l\'Histoire',
    'Lux': 'Guide fir d\'Geschicht',
    'Slovenian': 'Napotki za dialoško branje zgodbe',
    'Italian': '',
    'German': 'Lese-Leitfaden - dies ist ein Leifaden für jede Geschichte mit Fragen, welche Lehrpersonen stellen oder auch selbst beantworten können.',
    'Greek': ''
  },
  'dialog-guide': {
    'English': 'Dialogic reading Guide - this is the "general+ 2-page guide we wrote in Trento',
    'French': 'Guide de Lecture Dialogique',
    'Lux': 'Guide fir Dialogescht Liesen',
    'Slovenian': 'Vodnik za dialoško branje',
    'Italian': '',
    'German': 'Dialogischer Leseleitfaden',
    'Greek': 'Οδηγός Διαλογικής Ανάγνωσης'
  },
  'go': {
    'English': 'Go',
    'French': 'Go',
    'Lux': 'Go',
    'Slovenian': 'Naprej',
    'Italian': '',
    'German': 'Los',
    'Greek': 'Πήγαινε'
  },
  'play': {
    'English': 'Play',
    'French': 'Play',
    'Lux': 'Play',
    'Slovenian': 'Predvajaj',
    'Italian': '',
    'German': 'Abspielen',
    'Greek': 'Παίξε'
  },
  'pause': {
  'English': 'Pause',
  'French': 'Pause',
  'Lux': 'Pause',
  'Slovenian': 'Ustavi',
  'Italian': 'Pausa',
  'German': 'Pausieren',
  'Greek': 'Παύση'
  },
  'pc': {
    'English': 'Plurilingual Competence',
    'French': 'Compétence plurilingue',
    'Lux': 'Méisproochekompetenz',
    'Slovenian': 'Raznojezična zmožnost',
    'Italian': '',
    'German': 'Plurilinguale Kompetenz',
    'Greek': 'Πολυγλωσσικές δεξιότητες'
  },
  'els': {
    'English': 'Early Literacy Skills',
    'French': 'Compétences en littératie de la Petite Enfance',
    'Lux': 'Fréizäiteg Entwécklung vu Kompetenzen an der Literacy',
    'Slovenian': 'Začetno opismenjevanje',
    'Italian': '',
    'German': 'Frühe Literacy-Kompetenzen',
    'Greek': 'Πρώιμες Δεξιότητες Γραμματισμού'
  },
  'iau': {
    'English': 'Intercultural Awareness and Understanding',
    'French': 'Sensibilisation et compréhension interculturelles',
    'Lux': 'Interkulturellt Bewosstsinn a Verständnis',
    'Slovenian': 'Medkulturno zavedanje in razumevanje',
    'Italian': '',
    'German': 'Interkulturelle Bewusstsein und Verständnis',
    'Greek': 'Διαπολιτισμική συνειδητοποίηση και κατανόηση'
  },
  'la': {
    'English': 'Language Awareness',
    'French': 'Éveil aux Sciences',
    'Lux': 'Sproochbewosstsinn',
    'Slovenian': 'Jezikovno zavedanje',
    'Italian': '',
    'German': 'Sprachbewusstsein',
    'Greek': 'Γλωσσική επίγνωση'
  },
  'check-activities': {
    'English': 'Please check all activities you would like to download and press the download button or simply click on the activity button you would like to see.',
    'French': 'Veuillez cocher toutes les activités que vous souhaitez télécharger, puis appuyez sur le bouton de téléchargement ou cliquez simplement sur l\'activité que vous souhaitez afficher.',
    'Lux': 'Kräizt w.e.g. all Aktivitéiten un, déi Dir wëllt eroflueden. Klickt duerno op de Knäppchen \'Download\' oder klickt einfach op d\'Aktivitéit, déi Dir wëllt ugewise kréien.',
    'Slovenian': 'Prosimo, označite vse dejavnosti, ki jih želite prenesti, in kliknite gumb za prenos ali preprosto kliknite na dejavnost, ki jo želite videti.',
    'Italian': '',
    'German': 'Bitte überprüfe alle Aktivitäten, welche heruntergeladen werden sollen und klicke auf den Download-Knopf oder einfach auf den Aktivitäten-Knopf, welcher angezeigt werden soll.',
    'Greek': 'Παρακαλώ, επιλέξτε όλες τις δραστηριότητες που θέλετε να κατεβάσετε και πατήστε το κουμπί «Λήψη» ή απλά κάντε κλικ στο κουμπί της δραστηριότητας που θέλετε να δείτε.'
  },
  'select-all': {
    'English': 'Select All',
    'French': 'Sélectionner tout',
    'Lux': 'Alles Auswielen',
    'Slovenian': 'Izberi vse',
    'Italian': '',
    'German': 'Alle auswählen',
    'Greek': 'Επιλογή όλων'
  },
  'story-title': {
    'English': 'Story Title',
    'French': 'Titre de l\'Histoire',
    'Lux': 'Titel vun der Geschicht',
    'Slovenian': 'Naslov zgodbe',
    'Italian': '',
    'German': 'Titel der Geschichte',
    'Greek': 'Τίτλος ιστορίας'
  },
  'about-us': {
    'English': 'About Us',
    'French': 'À propos de Nous',
    'Lux': 'Iwwer Eis',
    'Slovenian': 'O nas',
    'Italian': '',
    'German': 'Über uns',
    'Greek': 'Σχετικά με εμάς'
  },
  'agentive-footer': {
    'English': 'AGENTIVE - A platform for multilingual education',
    'French': 'AGENTIVE – Une plateforme pour l\'éducation multilingue',
    'Lux': 'AGENTIVE – Eng Plattform fir Méisproochegkeet an der Bildung',
    'Slovenian': 'AGENTIVE - platforma za večjezično izobraževanje',
    'Italian': '',
    'German': 'Agentive - eine Plattform für die Förderung früher Mehrsprachigkeit',
    'Greek': 'AGENTIVE- Μια ψηφιακή πλατφόρμα για την πολυγλωσσική εκπαίδευση'
  },
  'contact-us': {
    'English': 'Contact Us',
    'French': 'Contactez-Nous',
    'Lux': 'Kontakt',
    'Slovenian': 'Kontakt',
    'Italian': '',
    'German': 'Kontaktiere uns',
    'Greek': 'Επικοινωνία'
  },
  'legal': {
    'English': 'Legal aspects',
    'French': 'Aspects juridiques',
    'Lux': 'Juristesch Aspekter',
    'Slovenian': 'Pravni vidiki',
    'Italian': '',
    'German': 'Rechtliches',
    'Greek': 'Νομικές πτυχές'
  },
  'impress': {
    'English': 'Impress',
    'French': 'Mentions légales',
    'Lux': 'Impressum',
    'Slovenian': 'Pravno obvestilo',
    'Italian': '',
    'German': 'Impressum',
    'Greek': 'Εντύπωση'
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