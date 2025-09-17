import { useState, useEffect } from 'react';

// Translation data based on your CSV
const translations: Record<string, Record<string, string>> = {
  'multilingual-ressources': {
    'English': 'Multilingual Resources',
    'French': 'Ressources Multilingues', 
    'Lux': 'Multilingual Ressourcen',
    'Slovenian': 'Večjezična gradiva',
    'Italian': 'Risorse Multilingui',
    'German': 'Mehrsprachige Materialien',
    'Greek': 'Πολυγλωσσικές πηγές'
  },
  'storytime': {
    'English': 'Storytime',
    'French': 'Heure des Histoires',
    'Lux': 'Storytime',
    'Slovenian': 'Zgodbe / Storytime',
    'Italian': 'Ora delle Storie',
    'German': 'Geschichten',
    'Greek': 'Η ιστορία μας'
  },
  'activities': {
    'English': 'Activities',
    'French': 'Activités',
    'Lux': 'Aktivitéiten',
    'Slovenian': 'Dejavnosti',
    'Italian': 'Attività',
    'German': 'Aktivitäten',
    'Greek': 'Δραστηριότητες'
  },
  'pedagogical-guide': {
  'English': 'Pedagogical Guide',
  'French': 'Guide pédagogique',
  'Lux': 'Pädagogesche Guide',
  'Slovenian': 'Pedagoški vodnik',
  'Italian': 'Guida Pedagogica',
  'German': 'Pädagogischer Leitfaden',
  'Greek': 'Παιδαγωγικός οδηγός'
  },
  'guide': {
  'English': 'Guide',
  'French': 'Guide', 
  'Lux': 'Guide',
  'Slovenian': 'Vodnik',
  'Italian': 'Guida',
  'German': 'Leitfaden',
  'Greek': 'Οδηγός'}
,
  'multilingual-stories': {
    'English': 'Multilingual Stories',
    'French': 'Histoires Multilingues',
    'Lux': 'Méisproocheg Geschichten',
    'Slovenian': 'Večjezične zgodbe',
    'Italian': 'Storie Multilingui',
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
    'Italian': 'Riguardo AGENTIVE',
    'German': 'Über Agentive',
    'Greek': 'Σχετικά με το AGENTIVE'
  },
  'team': {
    'English': 'The Team',
    'French': 'L\'Équipe',
    'Lux': 'Eist Team',
    'Slovenian': 'Projektna skupina',
    'Italian': 'Il Team',
    'German': 'Team',
    'Greek': 'Η ομάδα'
  },
  'blog': {
    'English': 'Blog',
    'French': 'Blog',
    'Lux': 'Blog',
    'Slovenian': 'Blog',
    'Italian': 'Blog',
    'German': 'Blog',
    'Greek': 'Το blog'
  },
  'dashboard': {
    'English': 'Dashboard',
    'French': 'Espace d\'Apprentissage',
    'Lux': 'Dashboard',
    'Slovenian': 'Nadzorna plošča',
    'Italian': 'Dashboard',
    'German': 'Dashboard',
    'Greek': 'Ταμπλό'
  },
  'overview': {
    'English': 'Overview',
    'French': 'Aperçu',
    'Lux': 'Iwwerbléck',
    'Slovenian': 'Pregled',
    'Italian': 'Panoramica',
    'German': 'Übersicht',
    'Greek': 'Επισκόπηση'
  },
  'listen-n-watch': {
    'English': 'Listen and Watch',
    'French': 'Écouter et Regarder',
    'Lux': 'Lauschteren a Kucken',
    'Slovenian': 'Poslušaj in glej',
    'Italian': 'Ascolta e Guarda',
    'German': 'Hören & Anschauen',
    'Greek': 'Άκουσε και Δες'
  },
  'read': {
    'English': 'Read',
    'French': 'Lire',
    'Lux': 'Liesen',
    'Slovenian': 'Preberi',
    'Italian': 'Leggi',
    'German': 'Lesen',
    'Greek': 'Διάβασε'
  },
  'available': {
    'English': 'Available in',
    'French': 'Disponible en',
    'Lux': 'Verfügbar op',
    'Slovenian': 'Na voljo v',
    'Italian': 'Disponibile in',
    'German': 'Verfügbar in',
    'Greek': 'Διαθέσιμο σε'
  },
  'stories': {
    'English': 'Stories',
    'French': 'Histoires',
    'Lux': 'Geschichten',
    'Slovenian': 'Zgodbe',
    'Italian': 'Storie',
    'German': 'Geschichten',
    'Greek': 'Ιστορίες'
  },
  'select-lang': {
    'English': 'Select a Language',
    'French': 'Choisissez une langue',
    'Lux': 'Sprooch auswielen',
    'Slovenian': 'Izberi jezik',
    'Italian': 'Seleziona una Lingua',
    'German': 'Wähle eine Sprache',
    'Greek': 'Επιλέξτε μια γλώσσα'
  },
  'select-lang-long': {
    'English': 'Please choose a language to view this story',
    'French': 'Veuillez choisir une langue pour voir cette histoire',
    'Lux': 'Wielt w.e.g. eng Sprooch fir dës Geschicht ze gesinn',
    'Slovenian': 'Izberi jezik zgodbe',
    'Italian': 'Scegli una lingua per vedere questa storia',
    'German': 'Wähle eine Sprache aus, um diese Geschichte zu lesen',
    'Greek': 'Παρακαλώ επιλέξτε μια γλώσσα για να δείτε την ιστορία'
  },
  'download': {
    'English': 'Download',
    'French': 'Télécharger',
    'Lux': 'Download',
    'Slovenian': 'Prenesi',
    'Italian': 'Scarica',
    'German': 'Herunterladen',
    'Greek': 'Λήψη'
  },
  'audio': {
    'English': 'Audio',
    'French': 'Audio',
    'Lux': 'Audio',
    'Slovenian': 'Avdio',
    'Italian': 'Audio',
    'German': 'Audio',
    'Greek': 'Ακουστικό υλικό'
  },
  'text': {
    'English': 'Text',
    'French': 'Texte',
    'Lux': 'Text',
    'Slovenian': 'Besedilo',
    'Italian': 'Testo',
    'German': 'Text',
    'Greek': 'Κείμνο'
  },
  'picture': {
    'English': 'Pictures',
    'French': 'Images',
    'Lux': 'Biller',
    'Slovenian': 'Slike',
    'Italian': 'Immagini',
    'German': 'Bilder',
    'Greek': 'Εικόνες'
  },
  'story-guide': {
    'English': 'Story\'s reading Guide',
    'French': 'Lecture de l\'Histoire',
    'Lux': 'Guide fir d\'Geschicht',
    'Slovenian': 'Napotki za dialoško branje zgodbe',
    'Italian': 'Guida di Lettura della Storia',
    'German': 'Lese-Leitfaden',
    'Greek': 'Οδηγός ανάγνωσης ιστορίας'
  },
  'dialog-guide': {
    'English': 'Dialogic reading Guide',
    'French': 'Guide de Lecture Dialogique',
    'Lux': 'Guide fir Dialogescht Liesen',
    'Slovenian': 'Vodnik za dialoško branje',
    'Italian': 'Guida di Lettura Dialogica',
    'German': 'Dialogischer Leseleitfaden',
    'Greek': 'Οδηγός Διαλογικής Ανάγνωσης'
  },
  'go': {
    'English': 'Go',
    'French': 'Go',
    'Lux': 'Go',
    'Slovenian': 'Naprej',
    'Italian': 'Vai',
    'German': 'Los',
    'Greek': 'Πήγαινε'
  },
  'play': {
    'English': 'Play',
    'French': 'Play',
    'Lux': 'Play',
    'Slovenian': 'Predvajaj',
    'Italian': 'Riproduci',
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
  'plurilingual-competence': {
    'English': 'Plurilingual Competence',
    'French': 'Compétence plurilingue',
    'Lux': 'Méisproochekompetenz',
    'Slovenian': 'Raznojezična zmožnost',
    'Italian': 'Competenza Plurilingue',
    'German': 'Plurilinguale Kompetenz',
    'Greek': 'Πολυγλωσσικές δεξιότητες'
  },
  'early-literacy-skills': {
    'English': 'Early Literacy Skills',
    'French': 'Compétences en littératie de la Petite Enfance',
    'Lux': 'Fréizäiteg Entwécklung vu Kompetenzen an der Literacy',
    'Slovenian': 'Začetno opismenjevanje',
    'Italian': 'Competenze di Alfabetizzazione Precoce',
    'German': 'Frühe Literacy-Kompetenzen',
    'Greek': 'Πρώιμες Δεξιότητες Γραμματισμού'
  },
  'intercultural-awareness-and-understanding': {
    'English': 'Intercultural Awareness and Understanding',
    'French': 'Sensibilisation et compréhension interculturelles',
    'Lux': 'Interkulturellt Bewosstsinn a Verständnis',
    'Slovenian': 'Medkulturno zavedanje in razumevanje',
    'Italian': 'Consapevolezza e Comprensione Interculturale',
    'German': 'Interkulturelles Bewusstsein und Verständnis',
    'Greek': 'Διαπολιτισμική συνειδητοποίηση και κατανόηση'
  },
  'language-awareness': {
    'English': 'Language Awareness',
    'French': 'Éveil aux Langues',
    'Lux': 'Sproochbewosstsinn',
    'Slovenian': 'Jezikovno zavedanje',
    'Italian': 'Consapevolezza Linguistica',
    'German': 'Sprachbewusstsein',
    'Greek': 'Γλωσσική επίγνωση'
  },
  'check-activities': {
    'English': 'Please check all activities you would like to download and press the download button or simply click on the activity button you would like to see.',
    'French': 'Veuillez cocher toutes les activités que vous souhaitez télécharger, puis appuyez sur le bouton de téléchargement ou cliquez simplement sur l\'activité que vous souhaitez afficher.',
    'Lux': 'Kräizt w.e.g. all Aktivitéiten un, déi Dir wëllt eroflueden. Klickt duerno op de Knäppchen \'Download\' oder klickt einfach op d\'Aktivitéit, déi Dir wëllt ugewise kréien.',
    'Slovenian': 'Prosimo, označite vse dejavnosti, ki jih želite prenesti, in kliknite gumb za prenos ali preprosto kliknite na dejavnost, ki jo želite videti.',
    'Italian': 'Seleziona tutte le attività che vuoi scaricare e premi il pulsante di download o semplicemente clicca sull\'attività che vuoi vedere.',
    'German': 'Bitte überprüfe alle Aktivitäten, welche heruntergeladen werden sollen und klicke auf den Download-Knopf oder einfach auf den Aktivitäten-Knopf, welcher angezeigt werden soll.',
    'Greek': 'Παρακαλώ, επιλέξτε όλες τις δραστηριότητες που θέλετε να κατεβάσετε και πατήστε το κουμπί «Λήψη» ή απλά κάντε κλικ στο κουμπί της δραστηριότητας που θέλετε να δείτε.'
  },
  'select-all': {
    'English': 'Select All',
    'French': 'Sélectionner tout',
    'Lux': 'Alles Auswielen',
    'Slovenian': 'Izberi vse',
    'Italian': 'Seleziona Tutto',
    'German': 'Alle auswählen',
    'Greek': 'Επιλογή όλων'
  },
  'story-title': {
    'English': 'Story Title',
    'French': 'Titre de l\'Histoire',
    'Lux': 'Titel vun der Geschicht',
    'Slovenian': 'Naslov zgodbe',
    'Italian': 'Titolo della Storia',
    'German': 'Titel der Geschichte',
    'Greek': 'Τίτλος ιστορίας'
  },
  'about-us': {
    'English': 'About Us',
    'French': 'À propos de Nous',
    'Lux': 'Iwwer Eis',
    'Slovenian': 'O nas',
    'Italian': 'Chi Siamo',
    'German': 'Über uns',
    'Greek': 'Σχετικά με εμάς'
  },
  'agentive-footer': {
    'English': 'AGENTIVE - A platform for multilingual education',
    'French': 'AGENTIVE – Une plateforme pour l\'éducation multilingue',
    'Lux': 'AGENTIVE – Eng Plattform fir Méisproochegkeet an der Bildung',
    'Slovenian': 'AGENTIVE - platforma za večjezično izobraževanje',
    'Italian': 'AGENTIVE - Una piattaforma per l\'educazione multilingue',
    'German': 'Agentive - eine Plattform für die Förderung früher Mehrsprachigkeit',
    'Greek': 'AGENTIVE- Μια ψηφιακή πλατφόρμα για την πολυγλωσσική εκπαίδευση'
  },
  'contact-us': {
    'English': 'Contact Us',
    'French': 'Contactez-Nous',
    'Lux': 'Kontakt',
    'Slovenian': 'Kontakt',
    'Italian': 'Contattaci',
    'German': 'Kontaktiere uns',
    'Greek': 'Επικοινωνία'
  },
  'legal': {
    'English': 'Legal aspects',
    'French': 'Aspects juridiques',
    'Lux': 'Juristesch Aspekter',
    'Slovenian': 'Pravni vidiki',
    'Italian': 'Aspetti Legali',
    'German': 'Rechtliches',
    'Greek': 'Νομικές πτυχές'
  },
  'impress': {
    'English': 'Impress',
    'French': 'Mentions légales',
    'Lux': 'Impressum',
    'Slovenian': 'Pravno obvestilo',
    'Italian': 'Note Legali',
    'German': 'Impressum',
    'Greek': 'Εντύπωση'
  },
  'available-languages': {
    'English': 'Available Languages',
    'French': 'Langues Disponibles',
    'Lux': 'Verfügbar Sproochen',
    'Slovenian': 'Razpoložljivi jeziki',
    'Italian': 'Lingue Disponibili',
    'German': 'Verfügbare Sprachen',
    'Greek': 'Διαθέσιμες γλώσσες'
  },
  'download-activities': {
    'English': 'Download Activities',
    'French': 'Télécharger les Activités',
    'Lux': 'Aktivitéiten eroflueden',
    'Slovenian': 'Prenesi dejavnosti',
    'Italian': 'Scarica Attività',
    'German': 'Aktivitäten herunterladen',
    'Greek': 'Λήψη δραστηριοτήτων'
  },
  'activity': {
    'English': 'Activity',
    'French': 'Activité',
    'Lux': 'Aktivitéit',
    'Slovenian': 'Dejavnost',
    'Italian': 'Attività',
    'German': 'Aktivität',
    'Greek': 'Δραστηριότητα'
  },
  'no-activities': {
    'English': 'No activities available for this group.',
    'French': 'Aucune activité disponible pour ce groupe.',
    'Lux': 'Keng Aktivitéiten verfügbar fir dëse Grupp.',
    'Slovenian': 'Za to skupino ni na voljo nobenih dejavnosti.',
    'Italian': 'Nessuna attività disponibile per questo gruppo.',
    'German': 'Keine Aktivitäten für diese Gruppe verfügbar.',
    'Greek': 'Δεν υπάρχουν διαθέσιμες δραστηριότητες για αυτήν την ομάδα.'
  },
  'select-activity-category': {
    'English': 'Please select an activity category below.',
    'French': 'Veuillez sélectionner une catégorie d\'activité ci-dessous.',
    'Lux': 'Wielt w.e.g. eng Aktivitéitskategorie hei ënnendrënner aus.',
    'Slovenian': 'Spodaj izberite kategorijo dejavnosti.',
    'Italian': 'Seleziona una categoria di attività qui sotto.',
    'German': 'Bitte wählen Sie unten eine Aktivitätskategorie aus.',
    'Greek': 'Παρακαλώ επιλέξτε μια κατηγορία δραστηριότητας παρακάτω.'
  },
  'no-activities-found': {
    'English': 'No activities found for this story.',
    'French': 'Aucune activité trouvée pour cette histoire.',
    'Lux': 'Keng Aktivitéiten fonnt fir dës Geschicht.',
    'Slovenian': 'Za to zgodbo ni najdenih dejavnosti.',
    'Italian': 'Nessuna attività trovata per questa storia.',
    'German': 'Keine Aktivitäten für diese Geschichte gefunden.',
    'Greek': 'Δεν βρέθηκαν δραστηριότητες για αυτήν την ιστορία.'
  },
  'listening': {
    'English': 'Listening',
    'French': 'Écoute',
    'Lux': 'Lauschteren',
    'Slovenian': 'Poslušanje',
    'Italian': 'Ascolto',
    'German': 'Hören',
    'Greek': 'Ακρόαση'
  },
  'reading': {
    'English': 'Reading',
    'French': 'Lecture',
    'Lux': 'Liesen',
    'Slovenian': 'Branje',
    'Italian': 'Lettura',
    'German': 'Lesen',
    'Greek': 'Ανάγνωση'
  },
  'vocabulary': {
    'English': 'Vocabulary',
    'French': 'Vocabulaire',
    'Lux': 'Vocabulaire',
    'Slovenian': 'Besedišče',
    'Italian': 'Vocabolario',
    'German': 'Wortschatz',
    'Greek': 'Λεξιλόγιο'
  },
  'grammar': {
    'English': 'Grammar',
    'French': 'Grammaire',
    'Lux': 'Grammaire',
    'Slovenian': 'Slovnica',
    'Italian': 'Grammatica',
    'German': 'Grammatik',
    'Greek': 'Γραμματική'
  },
  'welcome-agentive': {
    'English': 'Welcome to AGENTIVE',
    'French': 'Bienvenue dans le projet AGENTIVE',
    'Lux': 'Wëllkomm am Projet AGENTIVE',
    'Slovenian': 'Dobrodošli v AGENTIVE',
    'Italian': 'Benvenuti in AGENTIVE',
    'German': 'Willkommen bei AGENTIVE',
    'Greek': 'Καλώς ήρθατε στο AGENTIVE'
  },
  'boosting-diversity': {
    'English': 'Boosting linguistic diversity in early childhood education through synergies',
    'French': 'Renforcer la diversité linguistique dans l\'éducation de la petite enfance à travers des synergies',
    'Lux': 'D\'Sproochevillfalt an der Bildung vun der fréier Kandheet duerch Synergië stäerken',
    'Slovenian': 'Spodbujanje jezikovne raznolikosti v predšolski vzgoji prek medsektorskih sinergij',
    'Italian': 'Promuovere la diversità linguistica nell\'educazione della prima infanzia attraverso sinergie',
    'German': 'Förderung von sprachlicher Vielfalt in der frühkindlichen Bildung durch Synergien',
    'Greek': 'Ενίσχυση της συνεργασίας για τη γλωσσική ποικιλομορφία στην προσχολική αγωγή'
  },
  'welcome-intro': {
    'English': 'Welcome to the AGENTIVE platform! As part of an EU-funded Erasmus+ initiative, we are creating innovative tools to promote language learning in Early Childhood Education (ECE). Our goal is to provide free evidence-based resources for language and literacy development in ECE, create professional development materials for teachers and stimulate school-university-business synergies.',
    'French': 'Bienvenue sur la plateforme AGENTIVE ! Dans le cadre d\'une initiative Erasmus+ financée par l\'UE, nous développons des outils innovateurs pour promouvoir l\'apprentissage des langues dans l\'éducation de la petite enfance (EPE). Notre objectif est de fournir des ressources gratuites, fondées sur des données probantes, pour le développement du langage et de la littératie dans l\'EPE, de créer du matériel pour la formation professionnelle des enseignants/-tes, et d\'encourager les synergies entre écoles, universités et entreprises.',
    'Lux': 'Wëllkomm op der AGENTIVE-Plattform! Am Kader vun enger Erasmus+ Initiativ, déi vun der EU finanzéiert gëtt, entwéckele mir innovativ Ressourcë fir d\'Sproocheléieren an der Bildung vun der fréier Kandheet (Early Childhood Education, ECE). Zu Lëtzebuerg fërderen mir am Projet d\'Sproocheléieren am Zyklus C1. Eis Zil ass et, gratis, evidenzbaséiert Ressourcë fir d\'Sprooch- a Literacyentwécklung am C1 ze liwweren, Material fir d\'Weiderbildung vun Enseignanteën/Enseignanten ze erstellen, an d\'Synergien tëscht Schoulen, Universitéiten a Betriber ze encouragéieren.',
    'Slovenian': 'Dobrodošli na platformi projekta AGENTIVE! V sklopu projekta Erasmus+, ki ga financira EU, razvijamo inovativna orodja za spodbujanje učenja jezikov v predšolskem obdobju. Naš cilj je zagotoviti prosto dostopne, na strokovnih izsledkih temelječe vire za razvoj jezikovnih zmožnosti in zgodnjega opismenjevanja v predšolskem obdobju, oblikovati strokovna učna gradiva za vzgojitelje in učitelje ter spodbujati sinergije med šolami, univerzami in podjetji.',
    'Italian': 'Benvenuti sulla piattaforma AGENTIVE! Come parte di un\'iniziativa Erasmus+ finanziata dall\'UE, stiamo creando strumenti innovativi per promuovere l\'apprendimento delle lingue nell\'Educazione della Prima Infanzia (EPI). Il nostro obiettivo è fornire risorse gratuite basate su evidenze per lo sviluppo del linguaggio e dell\'alfabetizzazione nell\'EPI, creare materiali di sviluppo professionale per gli insegnanti e stimolare sinergie scuola-università-impresa.',
    'German': 'Willkommen auf der AGENTIVE-Plattform! Im Rahmen einer von der EU finanzierten Erasmus+-Initiative entwickeln wir innovative Werkzeuge zur Förderung des Sprachenlernens in der frühkindlichen Bildung (ECE). Unser Ziel ist es, kostenlose, evidenzbasierte Ressourcen für die Sprach- und Leseförderung in der FBBE zur Verfügung zu stellen, Materialien für die berufliche Weiterbildung von Lehrkräften zu erstellen und Synergien zwischen Schulen, Universitäten und Unternehmen zu fördern.',
    'Greek': 'Καλώς ήρθατε στην πλατφόρμα AGENTIVE! Στο πλαίσιο της ευρωπαϊκά χρηματοδοτούμενης πρωτοβουλίας Erasmus+, δημιουργούμε καινοτόμα εργαλεία για την προώθηση της εκμάθησης γλωσσών στην προσχολική αγωγή. Στόχος μας είναι να παρέχουμε δωρεάν τεκμηριωμένες πηγές για την ανάπτυξη της γλώσσας και του γραμματισμού στην προσχολική αγωγή, να δημιουργήσουμε υλικό επαγγελματικής ανάπτυξης για τους εκπαιδευτικούς και να τονώσουμε τις συνέργειες μεταξύ σχολείων, πανεπιστημίων και επιχειρήσεων.'
  },
  'what-can-expect': {
    'English': 'What Can You Expect?',
    'French': 'À quoi pouvez-vous vous attendre ?',
    'Lux': 'Wat kënnt Dir erwaarden?',
    'Slovenian': 'Kaj ponujamo boste tu našli?',
    'Italian': 'Cosa Puoi Aspettarti?',
    'German': 'Was können Sie erwarten?',
    'Greek': 'Τι σας προσφέρει;'
  },
  'what-expect-content': {
    'English': 'AGENTIVE creates resources that celebrate linguistic diversity, enabling teachers to design inclusive learning opportunities in order to help children develop multilingual competences. Our materials are openly available, meaning teachers and parents are free to adapt and share these.',
    'French': 'Le projet AGENTIVE crée des ressources qui valorisent la diversité linguistique et permettent aux enseignants/-tes de concevoir des possibilités de pédagogie différenciée afin d\'aider les enfants à développer des compétences multilingues. Nos ressources sont librement accessibles, ce qui signifie que les enseignants/-tes, les éducateurs/-trices et les parents peuvent les adapter et les partager gratuitement.',
    'Lux': 'Eis AGENTIVE Ressourcë valoriséiere Sproochendiversitéit an erméiglechen dem Léierpersonal inklusiv Léierméiglechkeeten ze entwéckelen, déi de Kanner hir multilingual Kompetenzen developpéieren. Eis Ressourcë si fräi zougänglech, wat bedeit, datt d\'Enseignanteën/Enseignanten, d\'Educatricen/d\'Educateuren an d\'Elteren se gratis benotzen, upassen a weiderginn däerfen.',
    'Slovenian': 'V sklopu projekta AGENTIVE razvijamo gradiva, ki slavijo jezikovno raznolikost in učiteljem omogočajo oblikovanje vključujočega učnega okolja za razvoj večjezičnih zmožnosti otrok. Naša gradiva so prosto dostopna, kar pomeni, da jih učitelji in starši lahko prosto prilagajajo in delijo.',
    'Italian': 'AGENTIVE crea risorse che celebrano la diversità linguistica, permettendo agli insegnanti di progettare opportunità di apprendimento inclusive per aiutare i bambini a sviluppare competenze multilingui. I nostri materiali sono liberamente disponibili, il che significa che insegnanti e genitori possono adattarli e condividerli liberamente.',
    'German': 'AGENTIVE erstellt Ressourcen, die sprachliche Vielfalt zelebrieren und es Lehrkräften ermöglichen, inklusive Lernangebote zu gestalten, um Kinder bei der Entwicklung mehrsprachiger Kompetenzen zu unterstützen. Unsere Materialien sind frei verfügbar, d. h. Lehrkräfte, Betreuende und Eltern können sie individuell anpassen und teilen.',
    'Greek': 'To έργο AGENTIVE δημιουργεί εκπαιδευτικές πηγές που αναδεικνύουν τη γλωσσική ποικιλομορφία και επιτρέπουν στους δασκάλους να σχεδιάζουν συμπεριληπτικές δράσεις μάθησης, προκειμένου να βοηθήσουν τα παιδιά να αναπτύξουν πολυγλωσσικές ικανότητες. Τα υλικά μας είναι διαθέσιμα σε ανοικτή προσβαση, πράγμα που σημαίνει ότι οι εκπαιδευτικοί, οι φροντιστές παιδιών και οι γονείς μπορούν να τα προσαρμόσουν και να τα διαμοιραστούν.'
  },
  'curious-team': {
    'English': 'Curious About the Team Behind AGENTIVE?',
    'French': 'Envie d\'en savoir plus sur l\'équipe qui se cache derrière le projet AGENTIVE ?',
    'Lux': 'Hu Dir Loscht méi iwwer d\'Team gewuer ze ginn, dat hannert AGENTIVE stécht?',
    'Slovenian': 'Vas zanima, kdo stoji za projektom AGENTIVE?',
    'Italian': 'Curioso del Team dietro AGENTIVE?',
    'German': 'Neugierig auf das Team hinter AGENTIVE?',
    'Greek': 'Θέλετε να μάθετε περισσότερα για την ομάδα του AGENTIVE;'
  },
  'team-description': {
    'English': 'AGENTIVE involves universities and organizations from Luxembourg, Switzerland, Greece, Slovenia, Germany and Italy. Together, we\'re leveraging expertise across academia, schools, and businesses to drive innovation in multilingual education.',
    'French': 'Le projet AGENTIVE réunit des universités et des organisations de plusieurs pays, dont le Luxembourg, la Suisse, la Grèce, la Slovénie, l\'Allemagne et l\'Italie. Ensemble, nous mettons en commun nos expertises issues du monde académique, des écoles et des entreprises pour faire avancer l\'innovation dans l\'éducation multilingue.',
    'Lux': 'AGENTIVE bréngt Universitéiten an Organisatiounen aus Lëtzebuerg, der Schwäiz, Griicheland, Slowenien, Däitschland an Italien zesummen. Mir deelen eist Wëssen aus der Akademie, de Schoulen an de Betriber fir d\'Innovatioun an der multilingualer Bildung virunzebréngen.',
    'Slovenian': 'V projektu AGENTIVE sodelujejo univerze in organizacije iz Luksemburga, Švice, Grčije, Slovenije, Nemčije in Italije. Združujemo strokovno znanje iz akademskega sveta, šol in podjetij, da bi spodbudili inovacije na področju večjezičnega izobraževanja.',
    'Italian': 'AGENTIVE coinvolge università e organizzazioni da Lussemburgo, Svizzera, Grecia, Slovenia, Germania e Italia. Insieme, stiamo sfruttando l\'expertise di mondo accademico, scuole e imprese per guidare l\'innovazione nell\'educazione multilingue.',
    'German': 'An AGENTIVE sind Universitäten und Organisationen aus Luxemburg, der Schweiz, Griechenland, Slowenien, Deutschland und Italien beteiligt. Gemeinsam nutzen wir das Fachwissen von Hochschulen, Schulen und Unternehmen, um Innovationen in der mehrsprachigen Bildung voranzutreiben.',
    'Greek': 'Στο έργο AGENTIVE συμμετέχουν πανεπιστήμια και οργανισμοί από το Λουξεμβούργο, την Ελβετία, την Ελλάδα, τη Σλοβενία, τη Γερμανία και την Ιταλία. Μαζί, αξιοποιούμε την τεχνογνωσία των πανεπιστημίων, των σχολείων και των επιχειρήσεων για να προωθήσουμε την καινοτομία στην πολύγλωσση εκπαίδευση.'
  },
  'passionate-team': {
    'English': 'Our team is made up of passionate researchers, teachers and developers working together to make a multilingual education accessible to everyone.',
    'French': 'Notre équipe est composée de chercheurs/-euses, d\'enseignants/-tes et de développeurs/-euses passionnés/-ées qui unissent leurs efforts pour rendre l\'éducation multilingue accessible à tous et à toutes.',
    'Lux': 'Eist Team besteet aus Fuerscherinnen/Fuerscher, Enseignanteën an engagéierten Entwécklerinnen/ Entwéckler, déi versichen, jidderengem eng multilingual Bildung zougänglech ze maachen.',
    'Slovenian': 'Našo ekipo sestavljajo predani raziskovalci, učitelji in razvijalci, ki si prizadevamo, da bi večjezično izobraževanje postalo dostopno vsem.',
    'Italian': 'Il nostro team è composto da ricercatori, insegnanti e sviluppatori appassionati che lavorano insieme per rendere l\'educazione multilingue accessibile a tutti.',
    'German': 'Unser Team besteht aus leidenschaftlichen Forschenden, Lehrenden und Entwickelnden, die gemeinsam daran arbeiten, eine mehrsprachige Bildung für alle zugänglich zu machen.',
    'Greek': 'Η ομάδα μας αποτελείται από παθιασμένους ερευνητές, εκπαιδευτικούς και προγραμματιστές που εργάζονται από κοινού για να καταστήσουν την πολύγλωσση εκπαίδευση προσιτή σε όλους.'
  },
  'follow-journey': {
    'English': 'Follow Our Journey',
    'French': 'Suivez notre aventure !',
    'Lux': 'Kommt mat op eis Aventure!',
    'Slovenian': 'Spremljajte nas na naši poti',
    'Italian': 'Segui il Nostro Viaggio',
    'German': 'Verfolgen Sie unsere Reise',
    'Greek': 'Ακολουθήστε το ταξίδι μας'
  },
  'journey-content': {
    'English': 'AGENTIVE began on 1st October 2024. Since then, we have designed 8 pedagogical sets of materials comprising stories in multiple languages and activities which are launched from Summer 2025. Whether you\'re a teacher, a parent, or simply curious about the world of multilingual education, there\'s something here for you.',
    'French': 'Le projet AGENTIVE a débuté le 1er octobre 2024. Depuis lors, nous avons développé 8 kits pédagogiques contenant entre autres des histoires en plusieurs langues, qui seront publiées à partir de l\'été 2025. Que vous soyez enseignant/-te, parent ou simplement curieux/-ieuse de découvrir le monde de l\'éducation multilingue, vous y trouverez votre bonheur.',
    'Lux': 'AGENTIVE huet den 1. Oktober 2024 ugefaangen. Zënterhier hu mir 8 pedagogesch Kitten entwéckelt, déi Geschichten a verschiddene Sproochen enthalen, an déi am Summer 2025 verëffentlecht ginn. Egal ob Dir Enseignanteën/Enseignanten, Elterendeel oder einfach nëmme virwëlzeg sidd fir d\'Welt vun der multilingualer Bildung ze entdecken – hei fannt Dir Äert Gléck.',
    'Slovenian': 'Projekt AGENTIVE se je začel 1. oktobra 2024. Od takrat smo oblikovali 8 kompletov pedagoških gradiv, ki vključujejo zgodbe in dejavnosti v več jezikih. Gradiva bodo na voljo od poletja 2025 dalje. Ne glede na to, ali ste učitelj, starš ali pa vas preprosto zanima svet večjezičnega izobraževanja – tukaj boste našli nekaj zase.',
    'Italian': 'AGENTIVE è iniziato il 1° ottobre 2024. Da allora, abbiamo progettato 8 set pedagogici di materiali che comprendono storie in più lingue e attività che saranno lanciate dall\'estate 2025. Che tu sia un insegnante, un genitore, o semplicemente curioso del mondo dell\'educazione multilingue, c\'è qualcosa qui per te.',
    'German': 'AGENTIVE begann am 1. Oktober 2024. Seitdem haben wir 8 pädagogische Materialsets mit Geschichten in mehreren Sprachen entwickelt, die ab Sommer 2025 veröffentlicht werden. Ob Sie Lehrkraft, Eltern oder einfach nur neugierig auf die Welt der mehrsprachigen Bildung sind, hier ist etwas für Sie dabei.',
    'Greek': 'Το AGENTIVE ξεκίνησε την 1η Οκτωβρίου 2024. Έκτοτε, έχουμε σχεδιάσει 8 σειρές παιδαγωγικών υλικών που περιλαμβάνουν ιστορίες σε πολλές γλώσσες, που ξεκίνησαν το καλοκαίρι του 2025. Είτε είστε εκπαιδευτικός, γονέας ή απλά ενδιαφέρεστε για τον κόσμο της πολυγλωσσικής εκπαίδευσης, υπάρχει υλικό εδώ για εσάς.'
  },
  'thanks-joining': {
    'English': 'Thanks for joining us on this journey—together, we\'re shaping the future of early childhood multilingual education!',
    'French': 'Merci de nous accompagner dans cette aventure — ensemble, nous construisons l\'avenir de l\'éducation multilingue de la petite enfance !',
    'Lux': 'Merci, datt Dir eis an dëser Aventure begleet – zesumme baue mir an der Zukunft vun der multilingualer Bildung an der fréier Kandheet!',
    'Slovenian': 'Hvala, da ste se nam pridružili na tej poti — skupaj lahko oblikujemo prihodnost večjezičnega izobraževanja predšolskih otrok!',
    'Italian': 'Grazie per esserti unito a noi in questo viaggio—insieme, stiamo plasmando il futuro dell\'educazione multilingue della prima infanzia!',
    'German': 'Danke, dass Sie uns auf dieser Reise begleiten - gemeinsam gestalten wir die Zukunft der frühkindlichen mehrsprachigen Bildung!',
    'Greek': 'Σας ευχαριστούμε που μας ακολουθείτε σε αυτό το ταξίδι, μαζί διαμορφώνουμε το μέλλον της πολυγλωσσικής προσχολικής αγωγής!'
  },
  'visit-about': {
    'English': 'Visit our page',
    'French': 'Visitez notre page',
    'Lux': 'Kuckt op eis',
    'Slovenian': 'Za več informacij obiščite stran',
    'Italian': 'Visita la nostra pagina',
    'German': 'Besuchen Sie unsere Seite',
    'Greek': 'Επισκεφθείτε τη σελίδα'
  },
  'check-out-team': {
    'English': 'Check out our team',
    'French': 'Veuillez consulter notre page',
    'Lux': 'Kuckt wgl. op eis Internetsäit',
    'Slovenian': '',
    'Italian': 'Controlla il nostro team',
    'German': 'Besuchen Sie dazu unsere Seite',
    'Greek': 'Παρακαλούμε επισκεφθείτε τη σελίδα'
  },
  'our-vision': {
    'English': 'Our Vision',
    'French': 'Notre vision',
    'Lux': 'Eis Visioun',
    'Slovenian': 'Naša vizija',
    'Italian': 'La nostra visione',
    'German': 'Unsere Vision',
    'Greek': 'Το όραμά μας'
  },
  'promoting-multilingualism': {
    'English': 'Promoting Multilingualism in ECE',
    'French': 'Promouvoir le multilinguisme dans l\'EPE',
    'Lux': 'D\'Méisproochegkeet am ECE fërderen',
    'Slovenian': 'Spodbujanje večjezičnosti v predšolski vzgoji',
    'Italian': 'Promuovere il multilinguismo nell\'ECE',
    'German': 'Förderung der Mehrsprachigkeit in der ECE',
    'Greek': 'Προώθηση της πολυγλωσσίας στην προσχολική αγωγή'
  },
  'empowering-multilingual-growth': {
    'English': 'Empowering Multilingual Growth',
    'French': 'Autonomiser la croissance multilingue',
    'Lux': 'Méisproocheg Entwécklung stäerken',
    'Slovenian': 'Opolnomočenje večjezične rasti',
    'Italian': 'Potenziare la crescita multilingue',
    'German': 'Mehrsprachiges Wachstum fördern',
    'Greek': 'Ενδυνάμωση της πολυγλωσσικής ανάπτυξης'
  },
  'empowering-multilingual-growth-desc': {
    'English': 'AGENTIVE aims to equip children with the tools to navigate and thrive in multilingual environments.',
    'French': 'AGENTIVE vise à fournir aux enfants les outils nécessaires pour naviguer et prospérer dans des environnements multilingues.',
    'Lux': 'AGENTIVE huet d\'Zil, de Kanner d\'Tools ze ginn, fir an multilinguale Ëmfeld ze navigéieren an ze blühen.',
    'Slovenian': 'AGENTIVE si prizadeva opremiti otroke z orodji za navigacijo in uspevanje v večjezičnih okoljih.',
    'Italian': 'AGENTIVE mira a fornire ai bambini gli strumenti per navigare e prosperare in ambienti multilingui.',
    'German': 'AGENTIVE zielt darauf ab, Kinder mit den Werkzeugen auszustatten, um in mehrsprachigen Umgebungen zu navigieren und zu gedeihen.',
    'Greek': 'Το AGENTIVE στοχεύει να εφοδιάσει τα παιδιά με τα εργαλεία για να πλοηγούνται και να ευδοκιμούν σε πολυγλωσσικά περιβάλλοντα.'
  },
  'bridging-language-gaps': {
    'English': 'Bridging Language Education Gaps',
    'French': 'Combler les lacunes de l\'éducation linguistique',
    'Lux': 'Lacunen an der Sproochenbildung iwwerwannen',
    'Slovenian': 'Premostitev vrzeli v jezikovnem izobraževanju',
    'Italian': 'Colmare le lacune nell\'educazione linguistica',
    'German': 'Lücken in der Sprachbildung schließen',
    'Greek': 'Γεφύρωση κενών στη γλωσσική εκπαίδευση'
  },
  'bridging-language-gaps-desc': {
    'English': 'Current research highlights the cognitive, social, and academic benefits of multilingualism, particularly when introduced early in life.',
    'French': 'Les recherches actuelles soulignent les avantages cognitifs, sociaux et académiques du multilinguisme, en particulier lorsqu\'il est introduit tôt dans la vie.',
    'Lux': 'Aktuell Fuerschung ënnersträicht déi kognitiv, sozial an akademesch Virdeeler vun der Méisproochegkeet, besonnesch wann se fréi am Liewen agefouert gëtt.',
    'Slovenian': 'Trenutne raziskave poudarjajo kognitivne, socialne in akademske prednosti večjezičnosti, zlasti ko se uvede zgodaj v življenju.',
    'Italian': 'La ricerca attuale evidenzia i benefici cognitivi, sociali e accademici del multilinguismo, in particolare quando introdotto precocemente nella vita.',
    'German': 'Aktuelle Forschung hebt die kognitiven, sozialen und akademischen Vorteile der Mehrsprachigkeit hervor, insbesondere wenn sie früh im Leben eingeführt wird.',
    'Greek': 'Η σύγχρονη έρευνα υπογραμμίζει τα γνωστικά, κοινωνικά και ακαδημαϊκά οφέλη της πολυγλωσσίας, ιδιαίτερα όταν εισάγεται νωρίς στη ζωή.'
  },
  'innovative-learning-collaboration': {
    'English': 'Innovative Learning & Collaboration',
    'French': 'Apprentissage et collaboration innovants',
    'Lux': 'Innovativ Léieren a Kollaboratioun',
    'Slovenian': 'Inovativno učenje in sodelovanje',
    'Italian': 'Apprendimento e collaborazione innovativi',
    'German': 'Innovatives Lernen und Zusammenarbeit',
    'Greek': 'Καινοτόμα μάθηση και συνεργασία'
  },
  'innovative-learning-collaboration-desc': {
    'English': 'Using innovative pedagogical sets, a digital platform, and professional training to foster collaboration.',
    'French': 'Utiliser des ensembles pédagogiques innovants, une plateforme numérique et une formation professionnelle pour favoriser la collaboration.',
    'Lux': 'Innovativ pedagogesch Sets, eng digital Plattform a berufflechen Training ze benotzen fir Kollaboratioun ze fërderen.',
    'Slovenian': 'Uporaba inovativnih pedagoških kompletov, digitalne platforme in strokovnega usposabljanja za spodbujanje sodelovanja.',
    'Italian': 'Utilizzare set pedagogici innovativi, una piattaforma digitale e formazione professionale per favorire la collaborazione.',
    'German': 'Nutzung innovativer pädagogischer Sets, einer digitalen Plattform und beruflicher Weiterbildung zur Förderung der Zusammenarbeit.',
    'Greek': 'Χρήση καινοτόμων παιδαγωγικών σετ, ψηφιακής πλατφόρμας και επαγγελματικής εκπαίδευσης για την προώθηση της συνεργασίας.'
  },
  'eu-funded-initiative': {
    'English': 'An EU-Funded Erasmus+ Initiative',
    'French': 'Une initiative Erasmus+ financée par l\'UE',
    'Lux': 'Eng EU finanzéiert Erasmus+ Initiativ',
    'Slovenian': 'Iniciativa Erasmus+, financirana s strani EU',
    'Italian': 'Un\'iniziativa Erasmus+ finanziata dall\'UE',
    'German': 'Eine von der EU finanzierte Erasmus+-Initiative',
    'Greek': 'Μια ευρωπαϊκά χρηματοδοτούμενη πρωτοβουλία Erasmus+'
  },
  'eu-initiative-desc': {
    'English': 'The AGENTIVE project is a groundbreaking initiative funded by the Erasmus+ programme of the European Union. It is a collaborative endeavour that unites universities and organizations from Luxembourg, Greece, Germany, Switzerland, Slovenia, and Italy to develop innovative multilingual educational resources for early childhood education (ECE) and to develop school-university and business synergies. This pan-European partnership emphasizes the EU\'s commitment to fostering multilingualism and digital transformation in education.',
    'French': 'Le projet AGENTIVE est une initiative révolutionnaire financée par le programme Erasmus+ de l\'Union européenne. Il s\'agit d\'un effort collaboratif qui unit des universités et des organisations du Luxembourg, de la Grèce, de l\'Allemagne, de la Suisse, de la Slovénie et de l\'Italie pour développer des ressources éducatives multilingues innovantes pour l\'éducation de la petite enfance (EPE) et pour développer des synergies école-université-entreprise. Ce partenariat paneuropéen souligne l\'engagement de l\'UE à favoriser le multilinguisme et la transformation numérique dans l\'éducation.',
    'Lux': 'De Projet AGENTIVE ass eng bahnbrechend Initiativ, déi vum Erasmus+ Programm vun der Europäescher Unioun finanzéiert gëtt. Et ass eng kollaborativ Ënnerhuelmen, déi Universitéiten an Organisatiounen aus Lëtzebuerg, Griicheland, Däitschland, der Schwäiz, Slowenien an Italien zesummebréngt fir innovativ multilingual Bildungsressourcë fir d\'Bildung vun der fréier Kandheet (ECE) ze entwéckelen an Schoul-Universitéit-Betrib Synergien ze entwéckelen. Dëse paneuropäesche Partnerschaft ënnersträicht d\'EU seng Engagement fir Méisproochegkeet an digital Transformatioun an der Bildung ze fërderen.',
    'Slovenian': 'Projekt AGENTIVE je prelomna iniciativa, financirana iz programa Erasmus+ Evropske unije. Gre za skupno prizadevanje, ki povezuje univerze in organizacije iz Luksemburga, Grčije, Nemčije, Švice, Slovenije in Italije za razvoj inovativnih večjezičnih izobraževalnih virov za predšolsko vzgojo (ECE) ter za razvoj sinergij med šolami, univerzami in podjetji. To vseevropsko partnerstvo poudarja zavezanost EU spodbujanju večjezičnosti in digitalne preobrazbe v izobraževanju.',
    'Italian': 'Il progetto AGENTIVE è un\'iniziativa rivoluzionaria finanziata dal programma Erasmus+ dell\'Unione Europea. È uno sforzo collaborativo che unisce università e organizzazioni da Lussemburgo, Grecia, Germania, Svizzera, Slovenia e Italia per sviluppare risorse educative multilingui innovative per l\'educazione della prima infanzia (ECE) e per sviluppare sinergie scuola-università-impresa. Questa partnership paneuropea sottolinea l\'impegno dell\'UE nel promuovere il multilinguismo e la trasformazione digitale nell\'istruzione.',
    'German': 'Das AGENTIVE-Projekt ist eine bahnbrechende Initiative, die vom Erasmus+-Programm der Europäischen Union finanziert wird. Es ist ein kollaboratives Unterfangen, das Universitäten und Organisationen aus Luxemburg, Griechenland, Deutschland, der Schweiz, Slowenien und Italien zusammenbringt, um innovative mehrsprachige Bildungsressourcen für die frühkindliche Bildung (ECE) zu entwickeln und Synergien zwischen Schulen, Universitäten und Unternehmen zu schaffen. Diese paneuropäische Partnerschaft unterstreicht das Engagement der EU zur Förderung von Mehrsprachigkeit und digitaler Transformation in der Bildung.',
    'Greek': 'Το έργο AGENTIVE είναι μια πρωτοποριακή πρωτοβουλία που χρηματοδοτείται από το πρόγραμμα Erasmus+ της Ευρωπαϊκής Ένωσης. Είναι μια συνεργατική προσπάθεια που ενώνει πανεπιστήμια και οργανισμούς από το Λουξεμβούργο, την Ελλάδα, τη Γερμανία, την Ελβετία, τη Σλοβενία και την Ιταλία για να αναπτύξουν καινοτόμες πολυγλωσσικές εκπαιδευτικές πηγές για την προσχολική αγωγή (ECE) και να αναπτύξουν συνέργειες σχολείων-πανεπιστημίων-επιχειρήσεων. Αυτή η πανευρωπαϊκή σύμπραξη υπογραμμίζει τη δέσμευση της ΕΕ για την προώθηση της πολυγλωσσίας και του ψηφιακού μετασχηματισμού στην εκπαίδευση.'
  },
  'collaboration-across-sectors': {
    'English': 'Collaboration Across Sectors',
    'French': 'Collaboration entre secteurs',
    'Lux': 'Kollaboratioun iwwer Secteuren',
    'Slovenian': 'Sodelovanje med sektorji',
    'Italian': 'Collaborazione tra settori',
    'German': 'Zusammenarbeit zwischen Sektoren',
    'Greek': 'Συνεργασία μεταξύ τομέων'
  },
  'collaboration-sectors-desc': {
    'English': 'Led by Prof. Dr. Claudine Kirsch at the University of Luxembourg, AGENTIVE brings together the University of Münster, the Free University of Bolzano, the University of Teacher Education of the Grisons (PHGR), the University of Primorska and Web2Learn. This consortium fosters synergies between academia and schools to create innovative multilingual education material. The collaboration is designed to ensure sustainable and impactful results that benefit teachers, students, parents and society as a whole.',
    'French': 'Dirigé par la Prof. Dr. Claudine Kirsch de l\'Université du Luxembourg, AGENTIVE rassemble l\'Université de Münster, l\'Université libre de Bolzano, l\'Université de formation des enseignants des Grisons (PHGR), l\'Université de Primorska et Web2Learn. Ce consortium favorise les synergies entre le monde académique et les écoles pour créer du matériel éducatif multilingue innovant. La collaboration est conçue pour assurer des résultats durables et impactants qui profitent aux enseignants, aux étudiants, aux parents et à la société dans son ensemble.',
    'Lux': 'Gefouert vun der Prof. Dr. Claudine Kirsch op der Universitéit Lëtzebuerg, bréngt AGENTIVE d\'Universitéit Münster, d\'Fräi Universitéit Bolzano, d\'Universitéit fir Enseignanteausbildung vun de Grisons (PHGR), d\'Universitéit Primorska a Web2Learn zesummen. Dëse Konsortium fërdert Synergien tëscht Akademie a Schoulen fir innovativt multilingualt Bildungsmaterial ze kreéieren. D\'Kollaboratioun ass entworf fir nohalteg an impaktféierend Resultater ze garantéieren, déi Enseignanten, Studenten, Elteren an der Gesellschaft als Ganzt profitéieren.',
    'Slovenian': 'Pod vodstvom prof. dr. Claudine Kirsch z Univerze v Luksemburgu AGENTIVE združuje Univerzo v Münstru, Svobodno univerzo v Bolzanu, Univerzo za izobraževanje učiteljev Grisons (PHGR), Univerzo na Primorskem in Web2Learn. Ta konzorcij spodbuja sinergije med akademskim svetom in šolami za ustvarjanje inovativnega večjezičnega izobraževalnega gradiva. Sodelovanje je zasnovano tako, da zagotavlja trajnostne in učinkovite rezultate, ki koristijo učiteljem, učencem, staršem in družbi kot celoti.',
    'Italian': 'Guidato dalla Prof.ssa Dr.ssa Claudine Kirsch dell\'Università del Lussemburgo, AGENTIVE riunisce l\'Università di Münster, l\'Università Libera di Bolzano, l\'Università di Formazione degli Insegnanti dei Grigioni (PHGR), l\'Università del Litorale e Web2Learn. Questo consorzio promuove sinergie tra mondo accademico e scuole per creare materiale educativo multilingue innovativo. La collaborazione è progettata per garantire risultati sostenibili e d\'impatto che beneficino insegnanti, studenti, genitori e la società nel suo insieme.',
    'German': 'Unter der Leitung von Prof. Dr. Claudine Kirsch an der Universität Luxemburg bringt AGENTIVE die Universität Münster, die Freie Universität Bozen, die Pädagogische Hochschule Graubünden (PHGR), die Universität Primorska und Web2Learn zusammen. Dieses Konsortium fördert Synergien zwischen Wissenschaft und Schulen, um innovative mehrsprachige Bildungsmaterialien zu schaffen. Die Zusammenarbeit ist darauf ausgelegt, nachhaltige und wirkungsvolle Ergebnisse zu gewährleisten, die Lehrern, Schülern, Eltern und der Gesellschaft als Ganzes zugutekommen.',
    'Greek': 'Υπό την ηγεσία της Καθηγήτριας Δρ. Claudine Kirsch στο Πανεπιστήμιο του Λουξεμβούργου, το AGENTIVE συγκεντρώνει το Πανεπιστήμιο του Münster, το Ελεύθερο Πανεπιστήμιο του Bolzano, το Πανεπιστήμιο Εκπαίδευσης Εκπαιδευτικών των Grisons (PHGR), το Πανεπιστήμιο της Primorska και την Web2Learn. Αυτό το κοινοπραξία προωθεί συνέργειες μεταξύ ακαδημαϊκού κόσμου και σχολείων για τη δημιουργία καινοτόμου πολυγλωσσικού εκπαιδευτικού υλικού. Η συνεργασία έχει σχεδιαστεί για να εξασφαλίσει βιώσιμα και επιδραστικά αποτελέσματα που ωφελούν εκπαιδευτικούς, μαθητές, γονείς και την κοινωνία στο σύνολό της.'
  },
  'addressing-multilingual-europe': {
    'English': 'Addressing a multilingual Europe',
    'French': 'S\'attaquer à une Europe multilingue',
    'Lux': 'Eng multilingual Europa adresséieren',
    'Slovenian': 'Obravnavanje večjezične Evrope',
    'Italian': 'Affrontare un\'Europa multilingue',
    'German': 'Ein mehrsprachiges Europa ansprechen',
    'Greek': 'Αντιμετώπιση μιας πολυγλωσσικής Ευρώπης'
  },
  'addressing-multilingual-europe-desc': {
    'English': 'In regions like Luxembourg, Switzerland, Tyrol and Primorska, multiple languages are spoken side by side and children may learn two societal languages from an early age through daily interactions or language learning in preschool. Additionally, migration patterns across Europe have increased the language diversity in societies and classrooms. Programmes for language awareness and early English thrive. AGENTIVE addresses these realities by developing inclusive and accessible, multilingual learning materials that are adaptable to different cultural and linguistic contexts.',
    'French': 'Dans des régions comme le Luxembourg, la Suisse, le Tyrol et la Primorska, plusieurs langues sont parlées côte à côte et les enfants peuvent apprendre deux langues sociétales dès leur plus jeune âge grâce aux interactions quotidiennes ou à l\'apprentissage des langues à la maternelle. De plus, les mouvements migratoires à travers l\'Europe ont augmenté la diversité linguistique dans les sociétés et les salles de classe. Les programmes de sensibilisation aux langues et d\'anglais précoce prospèrent. AGENTIVE répond à ces réalités en développant du matériel d\'apprentissage multilingue inclusif et accessible qui s\'adapte à différents contextes culturels et linguistiques.',
    'Lux': 'A Regioune wéi Lëtzebuerg, der Schwäiz, Tirol a Primorska ginn verschidde Sproochen nieft eneen geschwat a Kanner kënnen zwou gesellschaftlech Sproochen vu klengem u léieren duerch deeglech Interaktiounen oder Sproocheléieren am Spillschoul. Zousätzlech hunn d\'Migratiounsmuster iwwer Europa d\'Sproochediversitéit an de Gesellschaften a Klassensälen erhéicht. Programmer fir Sproochebewosstsinn a fréit Englesch blühen. AGENTIVE adresséiert dës Realitéiten andeem et inklusivt an zougänglecht, multilingualt Léiermaterial entwéckelt dat adaptéierbar op verschidde kulturell a sproochlech Kontexter ass.',
    'Slovenian': 'V regijah, kot so Luksemburg, Švica, Tirolska in Primorska, se govori več jezikov drug ob drugem in otroci lahko že zgodaj v življenju učijo dva družbena jezika preko vsakodnevnih interakcij ali učenja jezikov v vrtcu. Poleg tega so migracijski vzorci po Evropi povečali jezikovno raznolikost v družbah in učilnicah. Programi za jezikovno ozaveščenost in zgodnje učenje angleščine uspevajo. AGENTIVE se odziva na te realnosti z razvojem vključujočih in dostopnih večjezičnih učnih gradiv, ki se lahko prilagodijo različnim kulturnim in jezikovnim kontekstom.',
    'Italian': 'In regioni come il Lussemburgo, la Svizzera, il Tirolo e la Primorska, multiple lingue sono parlate fianco a fianco e i bambini possono imparare due lingue societarie fin dalla tenera età attraverso interazioni quotidiane o apprendimento delle lingue nella scuola materna. Inoltre, i modelli migratori in tutta Europa hanno aumentato la diversità linguistica nelle società e nelle aule. I programmi per la consapevolezza linguistica e l\'inglese precoce prosperano. AGENTIVE affronta queste realtà sviluppando materiali di apprendimento multilingui inclusivi e accessibili che sono adattabili a diversi contesti culturali e linguistici.',
    'German': 'In Regionen wie Luxemburg, der Schweiz, Tirol und Primorska werden mehrere Sprachen nebeneinander gesprochen, und Kinder können von klein auf zwei gesellschaftliche Sprachen durch tägliche Interaktionen oder Sprachlernen im Kindergarten lernen. Darüber hinaus haben Migrationsmuster in ganz Europa die Sprachvielfalt in Gesellschaften und Klassenzimmern erhöht. Programme für Sprachbewusstsein und frühes Englisch gedeihen. AGENTIVE geht auf diese Realitäten ein, indem es inklusive und zugängliche, mehrsprachige Lernmaterialien entwickelt, die an verschiedene kulturelle und sprachliche Kontexte anpassbar sind.',
    'Greek': 'Σε περιοχές όπως το Λουξεμβούργο, η Ελβετία, το Τιρόλο και η Primorska, πολλές γλώσσες ομιλούνται παράλληλα και τα παιδιά μπορούν να μάθουν δύο κοινωνικές γλώσσες από μικρή ηλικία μέσω καθημερινών αλληλεπιδράσεων ή εκμάθησης γλωσσών στον παιδικό σταθμό. Επιπλέον, τα μεταναστευτικά μοτίβα σε όλη την Ευρώπη έχουν αυξήσει τη γλωσσική ποικιλομορφία στις κοινωνίες και τις τάξεις. Προγράμματα για γλωσσική επίγνωση και πρώιμα αγγλικά ευδοκιμούν. Το AGENTIVE αντιμετωπίζει αυτές τις πραγματικότητες αναπτύσσοντας συμπεριληπτικά και προσβάσιμα, πολυγλωσσικά εκπαιδευτικά υλικά που είναι προσαρμόσιμα σε διαφορετικά πολιτισμικά και γλωσσικά πλαίσια.'
  },
  'open-access-resources': {
    'English': 'Open Access to Resources',
    'French': 'Accès libre aux ressources',
    'Lux': 'Oppenen Zougang zu Ressourcen',
    'Slovenian': 'Odprt dostop do virov',
    'Italian': 'Accesso aperto alle risorse',
    'German': 'Offener Zugang zu Ressourcen',
    'Greek': 'Ανοικτή πρόσβαση σε πόρους'
  },
  'open-access-resources-desc': {
    'English': 'One of AGENTIVE\'s core principles is openness. All educational materials developed through the project will be freely accessible, ensuring that teachers, schools, and parents can integrate them directly into their practice. The digital resources are designed to be flexible and modular, enabling educators to tailor them to the needs of their pupils, the curricular constraints and the specificities of the countries.',
    'French': 'L\'un des principes fondamentaux d\'AGENTIVE est l\'ouverture. Tous les matériels éducatifs développés dans le cadre du projet seront librement accessibles, garantissant que les enseignants, les écoles et les parents peuvent les intégrer directement dans leur pratique. Les ressources numériques sont conçues pour être flexibles et modulaires, permettant aux éducateurs de les adapter aux besoins de leurs élèves, aux contraintes curriculaires et aux spécificités des pays.',
    'Lux': 'Ee vun den Haaptprinzipien vum AGENTIVE ass d\'Offenheet. All Bildungsmaterialien, déi duerch de Projet entwéckelt ginn, sinn fräi zougänglech, fir ze garantéieren datt Enseignanten, Schoulen an Elteren se direkt an hir Praxis integréiere kënnen. D\'digital Ressourcen sinn entworf fir flexibel a modulär ze sinn, erméiglechen Educateuren se un d\'Bedierfnesser vun hire Schüler, d\'curricular Beschränkungen an d\'Spezifitéiten vun de Länner unzepassen.',
    'Slovenian': 'Eno od osnovnih načel AGENTIVE je odprtost. Vsi izobraževalni materiali, razviti v sklopu projekta, bodo prosto dostopni, kar zagotavlja, da jih učitelji, šole in starši lahko neposredno vključijo v svojo prakso. Digitalni viri so zasnovani tako, da so prilagodljivi in modularni, kar omogoča pedagogom, da jih prilagodijo potrebam svojih učencev, kurikularnim omejitvam in specifičnostim držav.',
    'Italian': 'Uno dei principi fondamentali di AGENTIVE è l\'apertura. Tutti i materiali educativi sviluppati attraverso il progetto saranno liberamente accessibili, garantendo che insegnanti, scuole e genitori possano integrarli direttamente nella loro pratica. Le risorse digitali sono progettate per essere flessibili e modulari, consentendo agli educatori di adattarle alle esigenze dei loro alunni, ai vincoli curriculari e alle specificità dei paesi.',
    'German': 'Eines der Grundprinzipien von AGENTIVE ist die Offenheit. Alle durch das Projekt entwickelten Bildungsmaterialien werden frei zugänglich sein, um sicherzustellen, dass Lehrer, Schulen und Eltern sie direkt in ihre Praxis integrieren können. Die digitalen Ressourcen sind so konzipiert, dass sie flexibel und modular sind, damit Pädagogen sie an die Bedürfnisse ihrer Schüler, die curricularen Einschränkungen und die Besonderheiten der Länder anpassen können.',
    'Greek': 'Μία από τις βασικές αρχές του AGENTIVE είναι η ανοικτότητα. Όλα τα εκπαιδευτικά υλικά που αναπτύσσονται μέσω του έργου θα είναι ελεύθερα προσβάσιμα, εξασφαλίζοντας ότι οι εκπαιδευτικοί, τα σχολεία και οι γονείς μπορούν να τα ενσωματώσουν άμεσα στην πρακτική τους. Οι ψηφιακοί πόροι είναι σχεδιασμένοι να είναι ευέλικτοι και αρθρωτοί, επιτρέποντας στους εκπαιδευτικούς να τους προσαρμόσουν στις ανάγκες των μαθητών τους, στους προγραμματικούς περιορισμούς και στις ιδιαιτερότητες των χωρών.'
  },
  'objectives': {
    'English': 'Objectives',
    'French': 'Objectifs',
    'Lux': 'Ziler',
    'Slovenian': 'Cilji',
    'Italian': 'Obiettivi',
    'German': 'Ziele',
    'Greek': 'Στόχοι'
  },
  'enhance-digital-transformation': {
    'English': 'Enhance digital transformation of schools and universities through open access early language learning resources and state-of-the-art pedagogies and training',
    'French': 'Améliorer la transformation numérique des écoles et universités grâce à des ressources d\'apprentissage précoce des langues en libre accès et des pédagogies et formations de pointe',
    'Lux': 'D\'digital Transformatioun vun de Schoulen an Universitéiten duerch oppenen Zougang zu fréien Sproocheléierressourcen a modernen Pedagogien a Training verstäerken',
    'Slovenian': 'Okrepiti digitalno preobrazbo šol in univerz preko odprtega dostopa do virov za zgodnje učenje jezikov ter najsodobnejših pedagoških pristopov in usposabljanja',
    'Italian': 'Migliorare la trasformazione digitale di scuole e università attraverso risorse di apprendimento linguistico precoce ad accesso aperto e pedagogie e formazione all\'avanguardia',
    'German': 'Die digitale Transformation von Schulen und Universitäten durch offenen Zugang zu frühkindlichen Sprachlernressourcen und modernste Pädagogik und Ausbildung verbessern',
    'Greek': 'Ενίσχυση του ψηφιακού μετασχηματισμού των σχολείων και πανεπιστημίων μέσω ανοικτής πρόσβασης σε πόρους πρώιμης εκμάθησης γλωσσών και πρωτοποριακών παιδαγωγικών μεθόδων και εκπαίδευσης'
  },
  'enhance-digital-transformation-desc': {
    'English': 'By creating open-access, state-of-the-art pedagogical tools, the project supports the digital readiness of schools and universities. Training programs for pre- and in-service ECE teachers are integral to this goal.',
    'French': 'En créant des outils pédagogiques de pointe en libre accès, le projet soutient la préparation numérique des écoles et universités. Les programmes de formation pour les enseignants ECE pré- et en service sont essentiels à cet objectif.',
    'Lux': 'Andeem oppenen Zougang, modern pedagogesch Tools geschaf ginn, ënnerstëtzt de Projet d\'digital Bereetschaft vun de Schoulen an Universitéiten. Trainingsprogrammer fir Vir- a Servicepersonal ECE Enseignanten sinn integral zu dësem Zil.',
    'Slovenian': 'Z ustvarjanjem najsodobnejših pedagoških orodij z odprtim dostopom projekt podpira digitalno pripravljenost šol in univerz. Programi usposabljanja za vzgojitelje predšolske vzgoje pred in med službo so ključni za ta cilj.',
    'Italian': 'Creando strumenti pedagogici all\'avanguardia ad accesso aperto, il progetto supporta la preparazione digitale di scuole e università. I programmi di formazione per insegnanti ECE pre- e in-servizio sono fondamentali per questo obiettivo.',
    'German': 'Durch die Schaffung modernster pädagogischer Werkzeuge mit offenem Zugang unterstützt das Projekt die digitale Bereitschaft von Schulen und Universitäten. Ausbildungsprogramme für Vor- und Inservice-ECE-Lehrer sind integraler Bestandteil dieses Ziels.',
    'Greek': 'Δημιουργώντας πρωτοποριακά παιδαγωγικά εργαλεία ανοικτής πρόσβασης, το έργο υποστηρίζει την ψηφιακή ετοιμότητα των σχολείων και πανεπιστημίων. Τα προγράμματα κατάρτισης για εκπαιδευτικούς προσχολικής αγωγής πριν και κατά τη διάρκεια της υπηρεσίας είναι αναπόσπαστο μέρος αυτού του στόχου.'
  },
  'leverage-synergies': {
    'English': 'Leverage open, multilingual and cross-sectoral ECE through university-school-business synergies',
    'French': 'Tirer parti de l\'EPE ouverte, multilingue et intersectorielle grâce aux synergies université-école-entreprise',
    'Lux': 'Oppenen, multilingualen a sektoriwwergräifenden ECE duerch Universitéit-Schoul-Betrib Synergien heibelen',
    'Slovenian': 'Izkoristiti odprto, večjezično in medsektorsko predšolsko vzgojo preko sinergij univerza-šola-podjetje',
    'Italian': 'Sfruttare l\'ECE aperta, multilingue e intersettoriale attraverso sinergie università-scuola-azienda',
    'German': 'Offene, mehrsprachige und sektorübergreifende ECE durch Universitäts-Schul-Unternehmens-Synergien nutzen',
    'Greek': 'Αξιοποίηση ανοικτής, πολυγλωσσικής και διατομεακής προσχολικής αγωγής μέσω συνεργειών πανεπιστημίου-σχολείου-επιχείρησης'
  },
  'leverage-synergies-desc': {
    'English': 'AGENTIVE fosters partnerships between schools, universities, and businesses to innovate multilingual education. These collaborations ensure the materials and approaches developed are practical, effective, and forward-thinking.',
    'French': 'AGENTIVE favorise les partenariats entre écoles, universités et entreprises pour innover l\'éducation multilingue. Ces collaborations garantissent que les matériaux et approches développés sont pratiques, efficaces et tournés vers l\'avenir.',
    'Lux': 'AGENTIVE fërdert Partnerschaften tëscht Schoulen, Universitéiten a Betriber fir multilingual Bildung ze innovéieren. Dës Kollaboratiounen garantéieren datt d\'Materialien an Approche déi entwéckelt ginn praktesch, effektiv a viruwiisend sinn.',
    'Slovenian': 'AGENTIVE spodbuja partnerstva med šolami, univerzami in podjetji za inoviranje večjezičnega izobraževanja. Ta sodelovanja zagotavljajo, da so razviti materiali in pristopi praktični, učinkoviti in napredni.',
    'Italian': 'AGENTIVE promuove partnership tra scuole, università e aziende per innovare l\'educazione multilingue. Queste collaborazioni garantiscono che i materiali e gli approcci sviluppati siano pratici, efficaci e lungimiranti.',
    'German': 'AGENTIVE fördert Partnerschaften zwischen Schulen, Universitäten und Unternehmen, um mehrsprachige Bildung zu innovieren. Diese Zusammenarbeiten stellen sicher, dass die entwickelten Materialien und Ansätze praktisch, effektiv und zukunftsorientiert sind.',
    'Greek': 'Το AGENTIVE προωθεί συνεργασίες μεταξύ σχολείων, πανεπιστημίων και επιχειρήσεων για την καινοτομία στην πολυγλωσσική εκπαίδευση. Αυτές οι συνεργασίες εξασφαλίζουν ότι τα υλικά και οι προσεγγίσεις που αναπτύσσονται είναι πρακτικές, αποτελεσματικές και προοδευτικές.'
  },
  'innovation-impact': {
    'English': 'Innovation and Impact',
    'French': 'Innovation et impact',
    'Lux': 'Innovatioun an Impakt',
    'Slovenian': 'Inovativnost in vpliv',
    'Italian': 'Innovazione e impatto',
    'German': 'Innovation und Wirkung',
    'Greek': 'Καινοτομία και αντίκτυπος'
  },
  'digital-resources-literacy': {
    'English': 'Digital Resources for Multilingual Literacy',
    'French': 'Ressources numériques pour la littératie multilingue',
    'Lux': 'Digital Ressourcen fir multilingual Literacy',
    'Slovenian': 'Digitalni viri za večjezično pismenost',
    'Italian': 'Risorse digitali per l\'alfabetizzazione multilingue',
    'German': 'Digitale Ressourcen für mehrsprachige Alphabetisierung',
    'Greek': 'Ψηφιακοί πόροι για πολυγλωσσικό γραμματισμό'
  },
  'digital-resources-literacy-desc': {
    'English': 'The project provides open, digital materials that promote the learning of languages and literacy, addressing a key gap in early childhood education.',
    'French': 'Le projet fournit des matériaux numériques ouverts qui favorisent l\'apprentissage des langues et de la littératie, comblant une lacune clé dans l\'éducation de la petite enfance.',
    'Lux': 'De Projet liwwert oppen, digital Materialien déi d\'Léiere vu Sproochen a Literacy fërderen, an adresséiert eng Schlëssellacune an der Bildung vun der fréier Kandheet.',
    'Slovenian': 'Projekt zagotavlja odprte digitalne materiale, ki spodbujajo učenje jezikov in pismenost, ter naslavljajo ključno vrzel v predšolski vzgoji.',
    'Italian': 'Il progetto fornisce materiali digitali aperti che promuovono l\'apprendimento delle lingue e dell\'alfabetizzazione, affrontando una lacuna chiave nell\'educazione della prima infanzia.',
    'German': 'Das Projekt stellt offene, digitale Materialien zur Verfügung, die das Lernen von Sprachen und Alphabetisierung fördern und eine Schlüssellücke in der frühkindlichen Bildung schließen.',
    'Greek': 'Το έργο παρέχει ανοικτά, ψηφιακά υλικά που προωθούν την εκμάθηση γλωσσών και τον γραμματισμό, αντιμετωπίζοντας ένα βασικό κενό στην προσχολική αγωγή.'
  },
  'equipping-educators': {
    'English': 'Equipping Educators',
    'French': 'Équiper les éducateurs',
    'Lux': 'Educateuren equipéieren',
    'Slovenian': 'Opremljanje pedagogov',
    'Italian': 'Equipaggiare gli educatori',
    'German': 'Pädagogen ausstatten',
    'Greek': 'Εξοπλισμός εκπαιδευτικών'
  },
  'equipping-educators-desc': {
    'English': 'By equipping pre- and in-service teachers with evidence-based strategies and digital competencies, AGENTIVE empowers educators to implement multilingual teaching effectively',
    'French': 'En équipant les enseignants pré- et en service avec des stratégies fondées sur des preuves et des compétences numériques, AGENTIVE permet aux éducateurs de mettre en œuvre efficacement l\'enseignement multilingue',
    'Lux': 'Andeem Vir- a Servicepersonal Enseignanten mat evidenzbaséierte Strategien a digitale Kompetenzen equipéiert ginn, erméiglecht AGENTIVE Educateuren multilingual Ënnerweisung effektiv ze implementéieren',
    'Slovenian': 'Z opremljanjem vzgojiteljev pred in med službo z na dokazih temelječimi strategijami in digitalnimi kompetencami AGENTIVE opolnomoči pedagoge za učinkovito izvajanje večjezičnega poučevanja',
    'Italian': 'Equipaggiando insegnanti pre- e in-servizio con strategie basate su evidenze e competenze digitali, AGENTIVE consente agli educatori di implementare efficacemente l\'insegnamento multilingue',
    'German': 'Durch die Ausstattung von Vor- und Inservice-Lehrern mit evidenzbasierten Strategien und digitalen Kompetenzen befähigt AGENTIVE Pädagogen, mehrsprachigen Unterricht effektiv umzusetzen',
    'Greek': 'Εξοπλίζοντας τους εκπαιδευτικούς πριν και κατά τη διάρκεια της υπηρεσίας με στρατηγικές βασισμένες σε αποδείξεις και ψηφιακές ικανότητες, το AGENTIVE δίνει τη δυνατότητα στους εκπαιδευτικούς να εφαρμόσουν αποτελεσματικά την πολυγλωσσική διδασκαλία'
  },
  'cross-sector-collaboration': {
    'English': 'Cross-Sector Collaboration',
    'French': 'Collaboration intersectorielle',
    'Lux': 'Sektoriwwergräifend Kollaboratioun',
    'Slovenian': 'Medsektorsko sodelovanje',
    'Italian': 'Collaborazione intersettoriale',
    'German': 'Sektorübergreifende Zusammenarbeit',
    'Greek': 'Διατομεακή συνεργασία'
  },
  'cross-sector-collaboration-desc': {
    'English': 'The synergy between academia and businesses drives the development of innovative educational tools and sustainable partnerships',
    'French': 'La synergie entre le monde académique et les entreprises stimule le développement d\'outils éducatifs innovants et de partenariats durables',
    'Lux': 'D\'Synergie tëscht der Akademie a Betriber dreizt d\'Entwécklung vun innovative pädagogesche Tools a nohaltege Partnerschaften',
    'Slovenian': 'Sinergija med akademskim svetom in podjetji spodbuja razvoj inovativnih izobraževalnih orodij in trajnostnih partnerstev',
    'Italian': 'La sinergia tra mondo accademico e aziende guida lo sviluppo di strumenti educativi innovativi e partnership sostenibili',
    'German': 'Die Synergie zwischen Wissenschaft und Unternehmen treibt die Entwicklung innovativer Bildungstools und nachhaltiger Partnerschaften voran',
    'Greek': 'Η συνέργεια μεταξύ ακαδημαϊκού κόσμου και επιχειρήσεων οδηγεί στην ανάπτυξη καινοτόμων εκπαιδευτικών εργαλείων και βιώσιμων συνεργασιών'
  },
  'agentive-made-possible': {
    'English': 'The AGENTIVE project is made possible by:',
    'French': 'Le projet AGENTIVE est rendu possible par :',
    'Lux': 'De Projet AGENTIVE gëtt méiglech gemaach duerch:',
    'Slovenian': 'Projekt AGENTIVE omogočajo:',
    'Italian': 'Il progetto AGENTIVE è reso possibile da:',
    'German': 'Das AGENTIVE-Projekt wird ermöglicht durch:',
    'Greek': 'Το έργο AGENTIVE καθίσταται δυνατό από:'
  },
  'partner-universities': {
    'English': 'Partner Universities',
    'French': 'Universités Partenaires',
    'Lux': 'Partner Universitéiten',
    'Slovenian': 'Partnerske univerze',
    'Italian': 'Università Partner',
    'German': 'Partner-Universitäten',
    'Greek': 'Συνεργαζόμενα Πανεπιστήμια'
  },
  'university-luxembourg': {
    'English': 'University of Luxembourg',
    'French': 'Université du Luxembourg',
    'Lux': 'Universitéit Lëtzebuerg',
    'Slovenian': 'Univerza v Luksemburgu',
    'Italian': 'Università del Lussemburgo',
    'German': 'Universität Luxemburg',
    'Greek': 'Πανεπιστήμιο του Λουξεμβούργου'
  },
  'university-muenster': {
    'English': 'University of Münster',
    'French': 'Université de Münster',
    'Lux': 'Universitéit Münster',
    'Slovenian': 'Univerza v Münstru',
    'Italian': 'Università di Münster',
    'German': 'Universität Münster',
    'Greek': 'Πανεπιστήμιο του Münster'
  },
  'university-grisons': {
    'English': 'University of Teacher Education of Grisons',
    'French': 'Université de Formation des Enseignants des Grisons',
    'Lux': 'Universitéit fir Enseignanteausbildung vun de Grisons',
    'Slovenian': 'Univerza za izobraževanje učiteljev Grisons',
    'Italian': 'Università di Formazione degli Insegnanti dei Grigioni',
    'German': 'Pädagogische Hochschule Graubünden',
    'Greek': 'Πανεπιστήμιο Εκπαίδευσης Εκπαιδευτικών των Grisons'
  },
  'university-bozen': {
    'English': 'Free University of Bozen-Bolzano',
    'French': 'Université Libre de Bolzano',
    'Lux': 'Fräi Universitéit Bolzano',
    'Slovenian': 'Svobodna univerza v Bolzanu',
    'Italian': 'Libera Università di Bolzano',
    'German': 'Freie Universität Bozen',
    'Greek': 'Ελεύθερο Πανεπιστήμιο του Bolzano'
  },
  'university-primorska': {
    'English': 'University of Primorska',
    'French': 'Université de Primorska',
    'Lux': 'Universitéit Primorska',
    'Slovenian': 'Univerza na Primorskem',
    'Italian': 'Università del Litorale',
    'German': 'Universität Primorska',
    'Greek': 'Πανεπιστήμιο της Primorska'
  },
  'web2learn': {
    'English': 'Web2Learn',
    'French': 'Web2Learn',
    'Lux': 'Web2Learn',
    'Slovenian': 'Web2Learn',
    'Italian': 'Web2Learn',
    'German': 'Web2Learn',
    'Greek': 'Web2Learn'
  },
  'project-management-educational-development': {
    'English': 'Project Management & Educational Development',
    'French': 'Gestion de Projet & Développement Éducatif',
    'Lux': 'Projektmanagement & Pädagogesch Entwécklung',
    'Slovenian': 'Vodenje projekta in izobraževalni razvoj',
    'Italian': 'Gestione del Progetto e Sviluppo Educativo',
    'German': 'Projektmanagement & Bildungsentwicklung',
    'Greek': 'Διαχείριση Έργου & Εκπαιδευτική Ανάπτυξη'
  },
  'platform-development': {
    'English': 'Platform Development',
    'French': 'Développement de Plateforme',
    'Lux': 'Plattform Entwécklung',
    'Slovenian': 'Razvoj platforme',
    'Italian': 'Sviluppo della Piattaforma',
    'German': 'Plattform-Entwicklung',
    'Greek': 'Ανάπτυξη Πλατφόρμας'
  },
  'educational-material-concept': {
    'English': 'Educational Material & Concept',
    'French': 'Matériel Éducatif & Concept',
    'Lux': 'Bildungsmaterial & Konzept',
    'Slovenian': 'Izobraževalno gradivo in koncept',
    'Italian': 'Materiale Educativo e Concetto',
    'German': 'Bildungsmaterial & Konzept',
    'Greek': 'Εκπαιδευτικό Υλικό & Έννοια'
  },
  'open-educational-resources': {
    'English': 'Open Educational Resources',
    'French': 'Ressources Éducatives Ouvertes',
    'Lux': 'Oppen Bildungsressourcen',
    'Slovenian': 'Odprti izobraževalni viri',
    'Italian': 'Risorse Educative Aperte',
    'German': 'Offene Bildungsressourcen',
    'Greek': 'Ανοικτές Εκπαιδευτικές Πηγές'
  },
  'project-manager': {
    'English': 'Project Manager',
    'French': 'Gestionnaire de Projet',
    'Lux': 'Projektmanager',
    'Slovenian': 'Vodja projekta',
    'Italian': 'Responsabile del Progetto',
    'German': 'Projektmanager',
    'Greek': 'Διευθυντής Έργου'
  },
  'language-education': {
    'English': 'Language Education',
    'French': 'Éducation Linguistique',
    'Lux': 'Sproochenbildung',
    'Slovenian': 'Jezikovno izobraževanje',
    'Italian': 'Educazione Linguistica',
    'German': 'Sprachbildung',
    'Greek': 'Γλωσσική Εκπαίδευση'
  },
  'platform-innovator': {
    'English': 'Platform Innovator',
    'French': 'Innovateur de Plateforme',
    'Lux': 'Plattform Innovateur',
    'Slovenian': 'Inovator platforme',
    'Italian': 'Innovatore della Piattaforma',
    'German': 'Plattform-Innovator',
    'Greek': 'Καινοτόμος Πλατφόρμας'
  },
  'platform-coordination': {
    'English': 'Platform Coordination',
    'French': 'Coordination de Plateforme',
    'Lux': 'Plattform Koordinatioun',
    'Slovenian': 'Koordinacija platforme',
    'Italian': 'Coordinamento della Piattaforma',
    'German': 'Plattform-Koordination',
    'Greek': 'Συντονισμός Πλατφόρμας'
  },
  'platform-development-assistant': {
    'English': 'Platform Development Assistant',
    'French': 'Assistant au Développement de Plateforme',
    'Lux': 'Assistent fir Plattform Entwécklung',
    'Slovenian': 'Pomočnik za razvoj platforme',
    'Italian': 'Assistente allo Sviluppo della Piattaforma',
    'German': 'Assistent für Plattform-Entwicklung',
    'Greek': 'Βοηθός Ανάπτυξης Πλατφόρμας'
  },
  'multilingual-education': {
    'English': 'Multilingual Education',
    'French': 'Éducation Multilingue',
    'Lux': 'Multilingual Bildung',
    'Slovenian': 'Večjezično izobraževanje',
    'Italian': 'Educazione Multilingue',
    'German': 'Mehrsprachige Bildung',
    'Greek': 'Πολυγλωσσική Εκπαίδευση'
  },
  'educational-material-design': {
    'English': 'Educational Material Design',
    'French': 'Conception de Matériel Éducatif',
    'Lux': 'Design vum Bildungsmaterial',
    'Slovenian': 'Oblikovanje izobraževalnega gradiva',
    'Italian': 'Progettazione di Materiale Educativo',
    'German': 'Design von Bildungsmaterialien',
    'Greek': 'Σχεδιασμός Εκπαιδευτικού Υλικού'
  },
  'psychological-development-education-material': {
    'English': 'Psychological Development of Education Material',
    'French': 'Développement Psychologique du Matériel Éducatif',
    'Lux': 'Psychologesch Entwécklung vum Bildungsmaterial',
    'Slovenian': 'Psihološki razvoj izobraževalnega gradiva',
    'Italian': 'Sviluppo Psicologico del Materiale Educativo',
    'German': 'Psychologische Entwicklung von Bildungsmaterial',
    'Greek': 'Ψυχολογική Ανάπτυξη Εκπαιδευτικού Υλικού'
  },
  'foreign-language-education': {
    'English': 'Foreign Language Education',
    'French': 'Éducation en Langues Étrangères',
    'Lux': 'Fremosproochen Bildung',
    'Slovenian': 'Izobraževanje tujih jezikov',
    'Italian': 'Educazione in Lingue Straniere',
    'German': 'Fremdsprachenbildung',
    'Greek': 'Εκπαίδευση Ξένων Γλωσσών'
  },
  'educational-design': {
    'English': 'Educational Design',
    'French': 'Conception Éducative',
    'Lux': 'Pädagogeschen Design',
    'Slovenian': 'Izobraževalno oblikovanje',
    'Italian': 'Progettazione Educativa',
    'German': 'Bildungsdesign',
    'Greek': 'Εκπαιδευτικός Σχεδιασμός'
  },
  'preliteracy-language-development': {
    'English': 'Preliteracy Language Development',
    'French': 'Développement du Langage Pré-littératie',
    'Lux': 'Vir-Literacy Sproochentwécklung',
    'Slovenian': 'Razvoj predpismenega jezika',
    'Italian': 'Sviluppo del Linguaggio Pre-alfabetizzazione',
    'German': 'Vorlese-Sprachentwicklung',
    'Greek': 'Προ-γραμματιστική Ανάπτυξη Γλώσσας'
  },
  'plurilingual-competencies': {
    'English': 'Plurilingual Competencies',
    'French': 'Compétences Plurilingues',
    'Lux': 'Méisproocheg Kompetenzen',
    'Slovenian': 'Raznojezične kompetence',
    'Italian': 'Competenze Plurilingui',
    'German': 'Mehrsprachige Kompetenzen',
    'Greek': 'Πολυγλωσσικές Ικανότητες'
  },
  'open-language-education': {
    'English': 'Open Language Education',
    'French': 'Éducation Linguistique Ouverte',
    'Lux': 'Oppen Sproochenbildung',
    'Slovenian': 'Odprto jezikovno izobraževanje',
    'Italian': 'Educazione Linguistica Aperta',
    'German': 'Offene Sprachbildung',
    'Greek': 'Ανοικτή Γλωσσική Εκπαίδευση'
  },
  'mail-contact': {
    'English': 'Mail: agentive@wi.uni-muenster.de',
    'French': 'Mail : agentive@wi.uni-muenster.de',
    'Lux': 'Mail: agentive@wi.uni-muenster.de',
    'Slovenian': 'E-pošta: agentive@wi.uni-muenster.de',
    'Italian': 'Mail: agentive@wi.uni-muenster.de',
    'German': 'Mail: agentive@wi.uni-muenster.de',
    'Greek': 'Mail: agentive@wi.uni-muenster.de'
  },
  'eu-funding-alt': {
    'English': 'Funded by the Erasmus+ Programme of the European Union',
    'French': 'Financé par le programme Erasmus+ de l\'Union européenne',
    'Lux': 'Finanzéiert vum Erasmus+ Programm vun der Europäescher Unioun',
    'Slovenian': 'Financirano iz programa Erasmus+ Evropske unije',
    'Italian': 'Finanziato dal Programma Erasmus+ dell\'Unione Europea',
    'German': 'Gefördert durch das Erasmus+ Programm der Europäischen Union',
    'Greek': 'Χρηματοδοτείται από το Πρόγραμμα Erasmus+ της Ευρωπαϊκής Ένωσης'
  },
    'partners': {
    'English': 'partners',
    'French': 'partenaires',
    'Lux': 'Partner',
    'Slovenian': 'partnerji',
    'Italian': 'partner',
    'German': 'Partner',
    'Greek': 'συνεργάτες'
  },
    'download-guides': {
    'English': 'Download Guides',
    'French': 'Télécharger les guides',
    'German': 'Leitfäden herunterladen',
    'Lux': 'Leitfäden eroflueden',
    'Slovenian': 'Prenesi vodnje',
    'Italian': 'Scarica guide',
    'Greek': 'Κατεβάστε οδηγούς'
  },
    'select-guide-language': {
    'English': 'Select Guide Language',
    'French': 'Sélectionner la langue du guide',
    'German': 'Guide-Sprache auswählen',
    'Lux': 'Guide-Sprooch wielen',
    'Slovenian': 'Izberi jezik vodnika',
    'Italian': 'Seleziona lingua guida',
    'Greek': 'Επιλέξτε γλώσσα οδηγού'
  },
  'cancel': {
    'English': 'Cancel',
    'French': 'Annuler', 
    'German': 'Abbrechen',
    'Lux': 'Ofbriechen',
    'Slovenian': 'Prekliči',
    'Italian': 'Annulla',
    'Greek': 'Ακύρωση'
},
'early-literacy-education': {
  'English': 'Early Literacy Education',
  'French': 'Éducation Précoce à la Littératie',
  'Lux': 'Fréizäiteg Schriftsproochen-Educatioun',
  'Slovenian': 'Zgodnje opismenjevanje',
  'Italian': 'Educazione alla Prima Alfabetizzazione',
  'German': 'Schriftspracherwerb',
  'Greek': 'Πρώιμη Εκπαίδευση Γραμματισμού'
},

'stimulating-multilingual-learning': {
  'English': 'Stimulating Multilingual Learning in Early Childhood Education',
  'French': 'Stimuler l\'apprentissage multilingue dans l\'éducation de la petite enfance',
  'Lux': 'Multilingualit Léieren an der Fréikendheetspädagogik stimuléieren',
  'Italian': 'Stimolare l\'apprendimento multilingue nell\'educazione della prima infanzia',
  'German': 'Mehrsprachiges Lernen in der frühkindlichen Bildung fördern',
  'Greek': 'Διέγερση της πολυγλωσσικής μάθησης στην προσχολική εκπαίδευση'
},

'promoting-multilingualism-ece': {
  'English': 'Our Vision: Promoting Multilingualism in ECE',
  'French': 'Notre vision : promouvoir le multilinguisme en EPE',
  'Lux': 'Eis Visioun: Multilingualitéit an der Fréikendheetspädagogik förderen',
  'Italian': 'La nostra visione: promuovere il multilinguismo nell\'ECE',
  'German': 'Unsere Vision: Mehrsprachigkeit in der frühkindlichen Bildung fördern',
  'Greek': 'Το όραμά μας: Προώθηση της πολυγλωσσίας στην ΠΠΑ'
},

'multilingual-intro-text': {
  'English': 'Languages play an important role in children\'s everyday lives in Europe; many speak several languages at home while also encountering further languages at school. Many European countries have introduced elements of multilingual education in Early Childhood Education (ECE). One such approach is translanguaging, a rich and child-friendly method of multilingualism, through which children can learn from their full language repertoires irrespective of language input and learning conditions. When children see their languages reflected in educational resources, feel understood and heard, and have access to books and stories in languages they understand and care about, teachers appear more at ease and confident to foster language learning as they lack multilingual resources.',
  'French': 'Les langues jouent un rôle important dans la vie quotidienne des enfants en Europe ; beaucoup parlent plusieurs langues à la maison tout en rencontrant d\'autres langues à l\'école. De nombreux pays européens ont introduit des éléments d\'éducation multilingue dans l\'éducation de la petite enfance (EPE). Une telle approche est le translanguaging, une méthode riche et adaptée aux enfants de multilinguisme, grâce à laquelle les enfants peuvent apprendre de leurs répertoires linguistiques complets indépendamment de l\'input linguistique et des conditions d\'apprentissage. Quand les enfants voient leurs langues reflétées dans les ressources éducatives, se sentent compris et entendus, et ont accès à des livres et histoires dans des langues qu\'ils comprennent et qui leur tiennent à cœur, les enseignants semblent plus à l\'aise et confiants pour favoriser l\'apprentissage des langues car ils manquent de ressources multilingues.',
  'Lux': 'Sproochen spillen eng wichteg Roll am Alldag vun de Kanner an Europa; vill schwätzen verschidde Sproochen doheem a begéinen och aner Sproochen an der Schoul. Vill europäesch Länner hunn Elementer vun der multilingualer Educatioun an der Fréikendheetspädagogik (FKP) ageféiert. Ee sou Approche ass Translanguaging, eng räich a kannerfrëndlech Method vum Multilingualismus, duerch déi Kanner aus hire kompletten Sproochenrepertoire léieren kënnen, onofhängeg vum Sproocheinput an de Léierbedéngungen. Wann Kanner hir Sproochen an pädagogesche Ressourcen reflektéiert gesinn, sech verstanen an héieren, an Accès op Bicher a Geschichten an Sproochen hunn déi si verstinn an ëm déi si sech suergen, schéngen d\'Enseignanten méi entspant a selbstbewosst ze sinn fir d\'Sproochenléieren ze förderen well et hinnen un multilingual Ressourcen feelt.',
  'Italian': 'Le lingue svolgono un ruolo importante nella vita quotidiana dei bambini in Europa; molti parlano diverse lingue a casa incontrando anche altre lingue a scuola. Molti paesi europei hanno introdotto elementi di educazione multilingue nell\'Educazione della Prima Infanzia (EPI). Un tale approccio è il translanguaging, un metodo ricco e adatto ai bambini del multilinguismo, attraverso il quale i bambini possono imparare dai loro repertori linguistici completi indipendentemente dall\'input linguistico e dalle condizioni di apprendimento. Quando i bambini vedono le loro lingue riflesse nelle risorse educative, si sentono compresi e ascoltati, e hanno accesso a libri e storie in lingue che comprendono e che stanno loro a cuore, gli insegnanti sembrano più a loro agio e fiduciosi nel promuovere l\'apprendimento linguistico poiché mancano di risorse multilingui.',
  'German': 'Sprachen spielen eine wichtige Rolle im Alltag von Kindern in Europa; viele sprechen mehrere Sprachen zu Hause und begegnen auch weiteren Sprachen in der Schule. Viele europäische Länder haben Elemente der mehrsprachigen Bildung in der frühkindlichen Bildung (FKB) eingeführt. Ein solcher Ansatz ist Translanguaging, eine reiche und kinderfreundliche Methode der Mehrsprachigkeit, durch die Kinder aus ihren vollständigen Sprachrepertoires lernen können, unabhängig von Sprachinput und Lernbedingungen. Wenn Kinder ihre Sprachen in Bildungsressourcen reflektiert sehen, sich verstanden und gehört fühlen und Zugang zu Büchern und Geschichten in Sprachen haben, die sie verstehen und die ihnen wichtig sind, scheinen Lehrer entspannter und selbstbewusster zu sein, das Sprachenlernen zu fördern, da ihnen mehrsprachige Ressourcen fehlen.',
  'Greek': 'Οι γλώσσες παίζουν σημαντικό ρόλο στην καθημερινή ζωή των παιδιών στην Ευρώπη· πολλά μιλούν διάφορες γλώσσες στο σπίτι ενώ συναντούν και άλλες γλώσσες στο σχολείο. Πολλές ευρωπαϊκές χώρες έχουν εισαγάγει στοιχεία πολυγλωσσικής εκπαίδευσης στην Προσχολική Αγωγή (ΠΑ). Μια τέτοια προσέγγιση είναι το translanguaging, μια πλούσια και φιλική προς τα παιδιά μέθοδος πολυγλωσσίας, μέσω της οποίας τα παιδιά μπορούν να μάθουν από τα πλήρη γλωσσικά τους ρεπερτόρια ανεξάρτητα από τη γλωσσική εισροή και τις συνθήκες μάθησης. Όταν τα παιδιά βλέπουν τις γλώσσες τους αντανακλασμένες σε εκπαιδευτικούς πόρους, αισθάνονται κατανοητά και ακουσμένα, και έχουν πρόσβαση σε βιβλία και ιστορίες σε γλώσσες που καταλαβαίνουν και νοιάζονται, οι εκπαιδευτικοί φαίνονται πιο άνετοι και σίγουροι για την προώθηση της γλωσσικής μάθησης καθώς τους λείπουν πολυγλωσσικοί πόροι.'
},

'agentive-bridge-gap': {
  'English': 'AGENTIVE seeks to bridge this gap by providing multilingual evidence-based resources that support literacy development in multiple languages and are easily adapted to various cultural and linguistic contexts. Professionals and parents can download our eight pedagogical sets (i.e., stories and follow-up activities) on our digital platform. AGENTIVE also offers seminars for student teachers and professional development courses for teachers to develop the digital and pedagogical competences required to use our materials effectively. Our school-university-business synergy will see to the wide dissemination of the findings.',
  'French': 'AGENTIVE cherche à combler cette lacune en fournissant des ressources multilingues basées sur des preuves qui soutiennent le développement de la littératie dans plusieurs langues et sont facilement adaptées à divers contextes culturels et linguistiques. Les professionnels et les parents peuvent télécharger nos huit ensembles pédagogiques (c\'est-à-dire des histoires et des activités de suivi) sur notre plateforme numérique. AGENTIVE propose également des séminaires pour les étudiants enseignants et des cours de développement professionnel pour les enseignants afin de développer les compétences numériques et pédagogiques nécessaires pour utiliser efficacement nos matériaux. Notre synergie école-université-entreprise veillera à la large diffusion des résultats.',
  'Lux': 'AGENTIVE sicht dës Lück ze fëllen andeems et multilingual beweis-baséiert Ressourcen ubitt déi d\'Literalitéitsentwécklung a verschiddenen Sproochen ënnerstëtzen an einfach un verschidde kulturell a sproochlech Kontexten ugepasst ginn. Professionnellen an Elteren kënnen eis aacht pädagogesch Seten (d.h. Geschichten an Suivi-Aktivitéiten) op eiser digitaler Plattform eroflueden. AGENTIVE bitt och Seminairen fir Studenten-Enseignanten a professionell Entwécklungscoursen fir Enseignanten fir d\'digital a pädagogesch Kompetenzen ze entwéckelen déi néideg sinn fir eis Materialen effektiv ze benotzen. Eis Schoul-Universitéit-Entreprise Synergie wäert fir d\'wäit Verbreedung vun de Resultater suergen.',
  'Italian': 'AGENTIVE cerca di colmare questa lacuna fornendo risorse multilingui basate su evidenze che supportano lo sviluppo dell\'alfabetizzazione in più lingue e sono facilmente adattate a vari contesti culturali e linguistici. Professionisti e genitori possono scaricare i nostri otto set pedagogici (cioè storie e attività di follow-up) sulla nostra piattaforma digitale. AGENTIVE offre anche seminari per studenti insegnanti e corsi di sviluppo professionale per insegnanti per sviluppare le competenze digitali e pedagogiche necessarie per utilizzare efficacemente i nostri materiali. La nostra sinergia scuola-università-azienda provvederà all\'ampia diffusione dei risultati.',
  'German': 'AGENTIVE versucht, diese Lücke zu schließen, indem es mehrsprachige evidenzbasierte Ressourcen bereitstellt, die die Alphabetisierungsentwicklung in mehreren Sprachen unterstützen und leicht an verschiedene kulturelle und sprachliche Kontexte angepasst werden können. Fachkräfte und Eltern können unsere acht pädagogischen Sets (d.h. Geschichten und Folgeaktivitäten) auf unserer digitalen Plattform herunterladen. AGENTIVE bietet auch Seminare für Lehramtsstudierende und berufliche Entwicklungskurse für Lehrer an, um die digitalen und pädagogischen Kompetenzen zu entwickeln, die erforderlich sind, um unsere Materialien effektiv zu nutzen. Unsere Schule-Universität-Unternehmen-Synergie wird für die weite Verbreitung der Erkenntnisse sorgen.',
  'Greek': 'Το AGENTIVE επιδιώκει να γεφυρώσει αυτό το κενό παρέχοντας πολυγλωσσικούς πόρους βασισμένους σε αποδείξεις που υποστηρίζουν την ανάπτυξη του γραμματισμού σε πολλές γλώσσες και προσαρμόζονται εύκολα σε διάφορα πολιτισμικά και γλωσσικά πλαίσια. Επαγγελματίες και γονείς μπορούν να κατεβάσουν τα οκτώ παιδαγωγικά μας σετ (δηλαδή ιστορίες και δραστηριότητες παρακολούθησης) στην ψηφιακή μας πλατφόρμα. Το AGENTIVE προσφέρει επίσης σεμινάρια για φοιτητές εκπαιδευτικούς και μαθήματα επαγγελματικής ανάπτυξης για εκπαιδευτικούς για την ανάπτυξη των ψηφιακών και παιδαγωγικών ικανοτήτων που απαιτούνται για την αποτελεσματική χρήση των υλικών μας. Η συνέργεια σχολείου-πανεπιστημίου-επιχείρησης θα φροντίσει για την ευρεία διάδοση των ευρημάτων.'
},

'erasmus-initiative-sectors': {
  'English': 'An EU-Funded Erasmus+ Initiative Across Sectors',
  'French': 'Une initiative Erasmus+ financée par l\'UE à travers les secteurs',
  'Lux': 'Eng EU-finanzéiert Erasmus+ Initiative iwwer Secteuren',
  'Italian': 'Un\'iniziativa Erasmus+ finanziata dall\'UE attraverso i settori',
  'German': 'Eine EU-finanzierte Erasmus+ Initiative sektorübergreifend',
  'Greek': 'Μια πρωτοβουλία Erasmus+ χρηματοδοτούμενη από την ΕΕ σε όλους τους τομείς'
},

'erasmus-description': {
  'English': 'The AGENTIVE project is a groundbreaking initiative funded by the Erasmus+ programme of the European Union. Uniting universities and organizations from six countries, this pan-European partnership endorses the EU\'s commitment to linguistic diversity, inclusion and digital transformation in education. Led by Prof. Dr. Claudine Kirsch, AGENTIVE brings together the University of Luxembourg, the University of Münster (Germany), the Free University of Bozen (Italy), the University of Teacher Education of the Grisons (Switzerland), the University of Primorska (Slovenia), and Web2Learn (Greece). In regions like Luxembourg, Switzerland, Tyrol and Primorska, multiple languages are spoken side by side and children may learn two societal languages from an early age through daily interactions or language learning in preschool. Additionally, migration patterns across Europe have increased the language diversity in societies and classrooms. Programmes for language awareness and early English thrive. AGENTIVE addresses these realities. Our synergies between academia and schools enable us to develop innovative pedagogies and evidence-based and sustainable multilingual learning materials that benefit teachers, children, and parents.',
  'French': 'Le projet AGENTIVE est une initiative révolutionnaire financée par le programme Erasmus+ de l\'Union européenne. Unissant des universités et organisations de six pays, ce partenariat paneuropéen soutient l\'engagement de l\'UE envers la diversité linguistique, l\'inclusion et la transformation numérique en éducation. Dirigé par le Prof. Dr. Claudine Kirsch, AGENTIVE rassemble l\'Université du Luxembourg, l\'Université de Münster (Allemagne), l\'Université libre de Bozen (Italie), l\'Université de formation des enseignants des Grisons (Suisse), l\'Université de Primorska (Slovénie), et Web2Learn (Grèce). Dans des régions comme le Luxembourg, la Suisse, le Tyrol et Primorska, plusieurs langues sont parlées côte à côte et les enfants peuvent apprendre deux langues sociétales dès le plus jeune âge par des interactions quotidiennes ou l\'apprentissage linguistique en maternelle. De plus, les modèles migratoires à travers l\'Europe ont augmenté la diversité linguistique dans les sociétés et les salles de classe. Les programmes de sensibilisation linguistique et d\'anglais précoce prospèrent. AGENTIVE aborde ces réalités. Nos synergies entre le monde académique et les écoles nous permettent de développer des pédagogies innovantes et des matériaux d\'apprentissage multilingues durables et basés sur des preuves qui bénéficient aux enseignants, aux enfants et aux parents.',
  'Lux': 'D\'AGENTIVE Projet ass eng bahnbrechend Initiative finanzéiert vum Erasmus+ Programm vun der Europäescher Unioun. Universitéiten an Organisatiounen aus sechs Länner verbannen, ënnerstëtzt dës paneuropäesch Partnerschaft d\'EU seng Engagement fir sproochlech Diversitéit, Inklusioun an digital Transformatioun an der Educatioun. Gefouert vum Prof. Dr. Claudine Kirsch, bréngt AGENTIVE d\'Universitéit Luxembourg, d\'Universitéit Münster (Däitschland), d\'Fräi Universitéit Bozen (Italien), d\'Universitéit fir Enseignanten-Ausbildung vun de Grisons (Schwäiz), d\'Universitéit Primorska (Slowenien), a Web2Learn (Griicheland) zesummen. A Regiounen wéi Luxembourg, Schwäiz, Tirol a Primorska ginn verschidde Sproochen niewenteneen geschwat an d\'Kanner kënnen zwou gesellschaftlech Sproochen vun fréi un iwwer alldeeglech Interaktiounen oder Sproochenléieren am Spillschoul léieren. Zousätzlech hunn d\'Migratiounsmusteren iwwer Europa d\'Sproochendiversitéit a Gesellschaften a Klassesälen erhéicht. Programmer fir Sproochenbewosstsein a fréien Englesch bléien. AGENTIVE adresséiert dës Realitéiten. Eis Synergien tëschent Akademie a Schoulen erméiglechen eis innovativ Pädagogiken an evidenzbaséiert an nohalteg multilingual Léiermaterialien ze entwéckelen déi Enseignanten, Kanner an Elteren profitéieren.',
  'Italian': 'Il progetto AGENTIVE è un\'iniziativa rivoluzionaria finanziata dal programma Erasmus+ dell\'Unione Europea. Unendo università e organizzazioni di sei paesi, questa partnership paneuropea sostiene l\'impegno dell\'UE verso la diversità linguistica, l\'inclusione e la trasformazione digitale nell\'istruzione. Guidato dalla Prof.ssa Dr. Claudine Kirsch, AGENTIVE riunisce l\'Università del Lussemburgo, l\'Università di Münster (Germania), l\'Università Libera di Bolzano (Italia), l\'Università di Formazione degli Insegnanti dei Grigioni (Svizzera), l\'Università del Litorale (Slovenia), e Web2Learn (Grecia). In regioni come Lussemburgo, Svizzera, Tirolo e Litorale, più lingue sono parlate fianco a fianco e i bambini possono imparare due lingue sociali fin dalla tenera età attraverso interazioni quotidiane o apprendimento linguistico nella scuola materna. Inoltre, i modelli migratori in Europa hanno aumentato la diversità linguistica nelle società e nelle aule. I programmi per la consapevolezza linguistica e l\'inglese precoce prosperano. AGENTIVE affronta queste realtà. Le nostre sinergie tra accademia e scuole ci permettono di sviluppare pedagogie innovative e materiali di apprendimento multilingue sostenibili e basati su evidenze che beneficiano insegnanti, bambini e genitori.',
  'German': 'Das AGENTIVE-Projekt ist eine bahnbrechende Initiative, die vom Erasmus+-Programm der Europäischen Union finanziert wird. Diese paneuropäische Partnerschaft, die Universitäten und Organisationen aus sechs Ländern vereint, unterstützt das Engagement der EU für sprachliche Vielfalt, Inklusion und digitale Transformation in der Bildung. Unter der Leitung von Prof. Dr. Claudine Kirsch bringt AGENTIVE die Universität Luxemburg, die Universität Münster (Deutschland), die Freie Universität Bozen (Italien), die Pädagogische Hochschule Graubünden (Schweiz), die Universität Primorska (Slowenien) und Web2Learn (Griechenland) zusammen. In Regionen wie Luxemburg, der Schweiz, Tirol und Primorska werden mehrere Sprachen nebeneinander gesprochen und Kinder können zwei gesellschaftliche Sprachen von früh an durch tägliche Interaktionen oder Sprachenlernen im Kindergarten lernen. Zusätzlich haben Migrationsmuster in Europa die sprachliche Vielfalt in Gesellschaften und Klassenzimmern erhöht. Programme für Sprachbewusstsein und frühes Englisch gedeihen. AGENTIVE geht auf diese Realitäten ein. Unsere Synergien zwischen Akademie und Schulen ermöglichen es uns, innovative Pädagogiken und evidenzbasierte und nachhaltige mehrsprachige Lernmaterialien zu entwickeln, die Lehrern, Kindern und Eltern zugutekommen.',
  'Greek': 'Το έργο AGENTIVE είναι μια πρωτοποριακή πρωτοβουλία χρηματοδοτούμενη από το πρόγραμμα Erasmus+ της Ευρωπαϊκής Ένωσης. Ενώνοντας πανεπιστήμια και οργανισμούς από έξι χώρες, αυτή η πανευρωπαϊκή εταιρική σχέση υποστηρίζει τη δέσμευση της ΕΕ για γλωσσική ποικιλομορφία, ένταξη και ψηφιακό μετασχηματισμό στην εκπαίδευση. Υπό την ηγεσία της Καθ. Δρ. Claudine Kirsch, το AGENTIVE συνενώνει το Πανεπιστήμιο του Λουξεμβούργου, το Πανεπιστήμιο του Münster (Γερμανία), το Ελεύθερο Πανεπιστήμιο του Bozen (Ιταλία), το Πανεπιστήμιο Εκπαίδευσης Εκπαιδευτικών των Grisons (Ελβετία), το Πανεπιστήμιο της Primorska (Σλοβενία), και το Web2Learn (Ελλάδα). Σε περιοχές όπως το Λουξεμβούργο, η Ελβετία, το Τιρόλο και η Primorska, πολλές γλώσσες μιλιούνται δίπλα-δίπλα και τα παιδιά μπορούν να μάθουν δύο κοινωνικές γλώσσες από μικρή ηλικία μέσω καθημερινών αλληλεπιδράσεων ή γλωσσικής μάθησης στο νηπιαγωγείο. Επιπλέον, τα μεταναστευτικά μοτίβα σε όλη την Ευρώπη έχουν αυξήσει τη γλωσσική ποικιλομορφία στις κοινωνίες και τις τάξεις. Προγράμματα για γλωσσική επίγνωση και πρώιμα αγγλικά ευδοκιμούν. Το AGENTIVE αντιμετωπίζει αυτές τις πραγματικότητες. Οι συνέργειες μας μεταξύ ακαδημίας και σχολείων μας επιτρέπουν να αναπτύξουμε καινοτόμες παιδαγωγικές και βασισμένα σε αποδείξεις και βιώσιμα πολυγλωσσικά μαθησιακά υλικά που ωφελούν εκπαιδευτικούς, παιδιά και γονείς.'
},

'innovation-and-impact': {
  'English': 'Innovation and Impact',
  'French': 'Innovation et Impact',
  'Lux': 'Innovatioun an Impact',
  'Italian': 'Innovazione e Impatto',
  'German': 'Innovation und Wirkung',
  'Greek': 'Καινοτομία και Επίδραση'
},

'objectives-project': {
  'English': 'Objectives of the Project',
  'French': 'Objectifs du projet',
  'Lux': 'Ziler vum Projet',
  'Italian': 'Obiettivi del progetto',
  'German': 'Ziele des Projekts',
  'Greek': 'Στόχοι του έργου'
},

'agentive-guided-objectives': {
  'English': 'AGENTIVE is guided by two key objectives.',
  'French': 'AGENTIVE est guidé par deux objectifs clés.',
  'Lux': 'AGENTIVE gëtt vun zwou Schlësselziler gefouert.',
  'Italian': 'AGENTIVE è guidato da due obiettivi chiave.',
  'German': 'AGENTIVE wird von zwei Schlüsselzielen geleitet.',
  'Greek': 'Το AGENTIVE καθοδηγείται από δύο βασικούς στόχους.'
},

'enhance-digital-transformation-full': {
  'English': 'Enhance digital transformation of schools and universities through innovative pedagogies and open education resources that teachers and parents can integrate directly into their practices. By creating open-access, innovative pedagogical tools, the project supports the digital readiness of schools and universities. Training programs for pre- and in-service ECE teachers are integral to this goal.',
  'French': 'Améliorer la transformation numérique des écoles et universités grâce à des pédagogies innovantes et des ressources éducatives ouvertes que les enseignants et parents peuvent intégrer directement dans leurs pratiques. En créant des outils pédagogiques innovants en libre accès, le projet soutient la préparation numérique des écoles et universités. Les programmes de formation pour les enseignants EPE en formation et en service sont intégraux à cet objectif.',
  'Lux': 'Digital Transformatioun vu Schoulen an Universitéiten duerch innovativ Pädagogiken an oppen Educatiounsressourcen verbesseren, déi Enseignanten an Elteren direkt an hir Praktiken integréieren kënnen. Andeems oppen-Accès, innovativ pädagogesch Tools erstallt ginn, ënnerstëtzt de Projet d\'digital Bereetschaft vu Schoulen an Universitéiten. Formatiounsprogrammer fir prä- an am Service FKP Enseignanten sinn integral fir dëst Zil.',
  'Italian': 'Migliorare la trasformazione digitale di scuole e università attraverso pedagogie innovative e risorse educative aperte che insegnanti e genitori possono integrare direttamente nelle loro pratiche. Creando strumenti pedagogici innovativi ad accesso aperto, il progetto supporta la prontezza digitale di scuole e università. I programmi di formazione per insegnanti EPI in formazione e in servizio sono integrali a questo obiettivo.',
  'German': 'Die digitale Transformation von Schulen und Universitäten durch innovative Pädagogiken und offene Bildungsressourcen verbessern, die Lehrer und Eltern direkt in ihre Praktiken integrieren können. Durch die Schaffung von frei zugänglichen, innovativen pädagogischen Werkzeugen unterstützt das Projekt die digitale Bereitschaft von Schulen und Universitäten. Ausbildungsprogramme für angehende und im Dienst befindliche FKB-Lehrer sind integraler Bestandteil dieses Ziels.',
  'Greek': 'Ενίσχυση του ψηφιακού μετασχηματισμού σχολείων και πανεπιστημίων μέσω καινοτόμων παιδαγωγικών και ανοιχτών εκπαιδευτικών πόρων που εκπαιδευτικοί και γονείς μπορούν να ενσωματώσουν απευθείας στις πρακτικές τους. Δημιουργώντας καινοτόμα παιδαγωγικά εργαλεία ανοιχτής πρόσβασης, το έργο υποστηρίζει την ψηφιακή ετοιμότητα σχολείων και πανεπιστημίων. Τα προγράμματα εκπαίδευσης για προ-υπηρεσίας και εν υπηρεσία εκπαιδευτικούς ΠΠΑ είναι αναπόσπαστα σε αυτόν τον στόχο.'
},

'leverage-synergies-full': {
  'English': 'Leverage open, multilingual and cross-sectoral ECE through university-school-business synergies: AGENTIVE fosters partnerships between schools, universities, and businesses to innovate multilingual education. These collaborations ensure that our pedagogical approaches and materials are appropriate, inclusive and forward-thinking.',
  'French': 'Tirer parti d\'une EPE ouverte, multilingue et intersectorielle grâce aux synergies université-école-entreprise : AGENTIVE favorise les partenariats entre écoles, universités et entreprises pour innover l\'éducation multilingue. Ces collaborations garantissent que nos approches pédagogiques et matériaux sont appropriés, inclusifs et avant-gardistes.',
  'Lux': 'Oppen, multilingual a cross-sektoriell FKP duerch Universitéit-Schoul-Entreprise Synergien ausnotzen: AGENTIVE fördert Partnerschaften tëschent Schoulen, Universitéiten, an Entreprisen fir multilingual Educatioun ze innovéieren. Dës Kollaboratiounen garantéieren datt eis pädagogesch Approchen a Materialen entspriechend, inklusiv an virausbleckend sinn.',
  'Italian': 'Sfruttare un\'EPI aperta, multilingue e intersettoriale attraverso sinergie università-scuola-azienda: AGENTIVE promuove partnership tra scuole, università e aziende per innovare l\'educazione multilingue. Queste collaborazioni garantiscono che i nostri approcci pedagogici e materiali siano appropriati, inclusivi e lungimiranti.',
  'German': 'Offene, mehrsprachige und sektorübergreifende FKB durch Universität-Schule-Unternehmen-Synergien nutzen: AGENTIVE fördert Partnerschaften zwischen Schulen, Universitäten und Unternehmen, um mehrsprachige Bildung zu innovieren. Diese Kollaborationen stellen sicher, dass unsere pädagogischen Ansätze und Materialien angemessen, inklusiv und zukunftsorientiert sind.',
  'Greek': 'Αξιοποίηση ανοιχτής, πολυγλωσσικής και διατομεακής ΠΠΑ μέσω συνεργειών πανεπιστημίου-σχολείου-επιχείρησης: Το AGENTIVE προωθεί εταιρικές σχέσεις μεταξύ σχολείων, πανεπιστημίων και επιχειρήσεων για την καινοτομία στην πολυγλωσσική εκπαίδευση. Αυτές οι συνεργασίες διασφαλίζουν ότι οι παιδαγωγικές μας προσεγγίσεις και υλικά είναι κατάλληλα, περιεκτικά και προοδευτικά.'
},

'model-for-future': {
  'English': 'A Model for the Future',
  'French': 'Un modèle pour l\'avenir',
  'Lux': 'E Modell fir d\'Zukunft',
  'Italian': 'Un modello per il futuro',
  'German': 'Ein Modell für die Zukunft',
  'Greek': 'Ένα μοντέλο για το μέλλον'
},

'model-future-description': {
  'English': 'By building on the expertise of its partners and leveraging the multilingual realities of Europe, AGENTIVE aims to set a benchmark for early childhood multilingual education. The project\'s outcomes will contribute to more inclusive and innovative learning environments across Europe. For more information about the AGENTIVE resources and upcoming events, please explore our platform. Together, we can inspire the next generation to embrace the power of multilingualism!',
  'French': 'En s\'appuyant sur l\'expertise de ses partenaires et en tirant parti des réalités multilingues de l\'Europe, AGENTIVE vise à établir une référence pour l\'éducation multilingue de la petite enfance. Les résultats du projet contribueront à des environnements d\'apprentissage plus inclusifs et innovants à travers l\'Europe. Pour plus d\'informations sur les ressources AGENTIVE et les événements à venir, veuillez explorer notre plateforme. Ensemble, nous pouvons inspirer la prochaine génération à embrasser le pouvoir du multilinguisme !',
  'Lux': 'Andeems op d\'Expertise vun hire Partneren opgebaut gëtt an d\'multilingual Realitéiten vun Europa genotzt ginn, zielt AGENTIVE dorop, e Benchmark fir d\'fréikindlech multilingual Educatioun ze setzen. D\'Resultater vum Projet wäerten zu méi inklusiven an innovativen Léierëmfeldungen iwwer Europa bäidroen. Fir méi Informatiounen iwwer d\'AGENTIVE Ressourcen an kommend Evenementer, erkënnegt w.e.g. eis Plattform. Zesummen kënnen mir déi nächst Generatioun inspiréieren fir d\'Kraaft vum Multilingualismus ze ëmfaassen!',
  'Italian': 'Costruendo sull\'expertise dei suoi partner e sfruttando le realtà multilingui dell\'Europa, AGENTIVE mira a stabilire un benchmark per l\'educazione multilingue della prima infanzia. I risultati del progetto contribuiranno ad ambienti di apprendimento più inclusivi e innovativi in tutta Europa. Per maggiori informazioni sulle risorse AGENTIVE e gli eventi futuri, esplorate la nostra piattaforma. Insieme, possiamo ispirare la prossima generazione ad abbracciare il potere del multilinguismo!',
  'German': 'Durch den Aufbau auf die Expertise seiner Partner und die Nutzung der mehrsprachigen Realitäten Europas zielt AGENTIVE darauf ab, einen Maßstab für die frühkindliche mehrsprachige Bildung zu setzen. Die Ergebnisse des Projekts werden zu inklusiveren und innovativeren Lernumgebungen in ganz Europa beitragen. Für weitere Informationen über die AGENTIVE-Ressourcen und kommende Veranstaltungen erkunden Sie bitte unsere Plattform. Gemeinsam können wir die nächste Generation dazu inspirieren, die Kraft der Mehrsprachigkeit zu umarmen!',
  'Greek': 'Χτίζοντας πάνω στην εμπειρογνωμοσύνη των εταίρων του και αξιοποιώντας τις πολυγλωσσικές πραγματικότητες της Ευρώπης, το AGENTIVE στοχεύει να θέσει ένα σημείο αναφοράς για την προσχολική πολυγλωσσική εκπαίδευση. Τα αποτελέσματα του έργου θα συμβάλουν σε πιο περιεκτικά και καινοτόμα μαθησιακά περιβάλλοντα σε όλη την Ευρώπη. Για περισσότερες πληροφορίες σχετικά με τους πόρους AGENTIVE και τις επερχόμενες εκδηλώσεις, παρακαλούμε εξερευνήστε την πλατφόρμα μας. Μαζί, μπορούμε να εμπνεύσουμε την επόμενη γενιά να αγκαλιάσει τη δύναμη της πολυγλωσσίας!'
},
'resources': {
    'English': 'Resources',
    'French': 'Ressources',
    'Lux': 'Ressourcen',
    'Slovenian': 'Viri',
    'Italian': 'Risorse',
    'German': 'Ressourcen',
    'Greek': 'Πόροι'
},
'story-resources': {
    'English': 'Story Resources',
    'French': 'Ressources de l\'histoire',
    'Lux': 'Geschicht Ressourcen',
    'Slovenian': 'Viri zgodbe',
    'Italian': 'Risorse della storia',
    'German': 'Geschichte Ressourcen',
    'Greek': 'Πόροι ιστορίας'

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