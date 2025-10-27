# AGENTIVE - A platform offering multilingual resources

## Table of Contents
1. Project Overview
2. Technology Stack
3. Project Structure
4. Getting Started
5. Core Features
6. Data Structure
7. Key Components
8. Running the Platform
9. Development Workflow
10. Deployment

---

## Project Overview

**AGENTIVE** is an open-source, multilingual digital platform designed to support early childhood education through interactive stories and learning activities. The platform promotes multilingualism by providing educational materials in multiple languages (English, French, German, Slovenian, Italian, Greek, Luxembourgish, and more).

### Key Objectives
- Provide open-access multilingual educational materials
- Support early literacy development across multiple languages
- Create an inclusive learning experience for diverse learners
- Empower educators with flexible, adaptable resources
- Bridge gaps in multilingual early childhood education

### Project Philosophy
AGENTIVE is built on the principle of **"Public Money, Public Code"** — resources funded publicly are made available as open-source materials, the images are licensed under Creative Commons.

---

## Technology Stack

### Frontend
- **Framework:** [Next.js 15+](https://nextjs.org) (React with App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI-based)
- **State Management:** React Context API
- **Internationalization:** i18next, react-i18next
- **Animation:** Framer Motion, Embla Carousel
- **PDF Handling:** jsPDF, html2canvas, pdfjs-dist
- **Authentication:** NextAuth.js
- **Icons:** Lucide React, React Icons

### Backend
- **Framework:** Flask (Python)
- **Database:** SQLAlchemy with cloud database support
- **ORM:** SQLAlchemy
- **CORS:** Flask-CORS
- **Environment:** Python with dotenv support

### Development Tools
- **Build Tool:** Turbopack (via Next.js)
- **Linting:** ESLint with TypeScript support
- **Code Formatting:** Prettier (implicit via ESLint config)
- **Version Control:** Git

---

## Project Structure

```
agentive/
├── frontend/                      # Next.js frontend application
│   ├── app/                       # Next.js App Router pages
│   │   ├── dashboard/             # User dashboard
│   │   │   ├── activities/        # Activities viewing
│   │   │   ├── stories/           # Story management
│   │   │   └── multilingual-stories/
│   │   ├── blog/                  # Blog pages
│   │   ├── about/                 # About pages
│   │   ├── team/                  # Team information
│   │   ├── auth/                  # Authentication routes
│   │   └── learning-material/     # Learning resources
│   ├── components/                # Reusable React components
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── audio-player/          # Audio playback components
│   │   ├── sidebar/               # Navigation sidebar
│   │   ├── ActivityViewer.tsx     # Activity display component
│   │   ├── StoryCarousel.tsx      # Story navigation carousel
│   │   ├── LanguageProvider.tsx   # Language context provider
│   │   ├── LanguageAwarePdfViewer.tsx
│   │   └── ...                    # Other specialized components
│   ├── data/                      # Data files and content
│   │   ├── index.ts               # Main activities index (PC, ELS, ICAU, LA groups)
│   │   ├── stories.json           # Story metadata
│   │   ├── button-translation.csv # Button translations
│   │   └── scripts/               # Data processing scripts
│   ├── hooks/                     # Custom React hooks
│   │   ├── use-translation.tsx    # Translation hook
│   │   └── use-mobile.tsx         # Mobile detection hook
│   ├── lib/                       # Utility functions
│   │   ├── utils.ts               # General utilities
│   │   ├── activity-utils.tsx     # Activity-specific utilities
│   ├── contexts/                  # React Context providers
│   │   └── WebsiteLanguageContext.tsx
│   ├── types/                     # TypeScript type definitions
│   │   └── story.tsx              # Story type definitions
│   ├── scripts/                   # Build and sync scripts
│   │   ├── sync-activities.ts     # Activity synchronization
│   │   └── sync-activities copy.ts
│   ├── public/                    # Static assets
│   │   ├── activities/            # Activity PDFs and resources
│   │   ├── audio/                 # Audio files
│   │   └── learning-material/     # Learning resources
│   ├── components.json            # shadcn/ui config
│   ├── tailwind.config.ts         # Tailwind CSS configuration
│   ├── tsconfig.json              # TypeScript configuration
│   ├── next.config.ts             # Next.js configuration
│   ├── package.json               # NPM dependencies
│   └── README.md                  # Frontend-specific docs
│
└── backend/                       # Flask backend (optional)
    ├── app/
    │   ├── __init__.py            # Flask app factory
    │   ├── config.py              # Configuration
    │   └── routes/                # API routes
    └── requirements.txt           # Python dependencies
    # backend was not used yet to
```

---

## Getting Started

### Prerequisites
- **Node.js:** 18+ LTS recommended
- **npm:** 9+ or yarn/pnpm
- **Python:** 3.9+ (for backend)
- **Git:** For version control

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/agentive.git
cd agentive/frontend
```

#### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

#### 3. Environment Setup
Create a `.env.local` file in the frontend directory:
```env

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

```

#### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Core Features

### 1. **Multilingual Stories**
- 8 complete narrative stories featuring "Bobba," a friendly alien
- Available in multiple languages (English, French, German, Slovenian, etc.)
- Interactive story reading with audio narration
- Text and image display with page navigation

### 2. **Structured Activities**
Activities are organized into 4 pedagogical groups:
- **PC (Plurilingual Competence):** Language learning through dialogue and theater
- **ELS (Early Literacy Skills):** Writing and symbol recognition activities
- **ICAU (Intercultural Awareness):** Exploring cultural diversity and emotions
- **LA (Language Awareness):** Phonological and linguistic exploration

Each activity includes:
- Language-specific audio files
- PDF worksheets and instructions
- Multiple language variants
- Structured learning objectives

### 3. **Language Support**
- **Supported Languages:** English (en), French (fr), German (de), Slovenian (svn), Italian (it), Greek (gr), Luxembourgish (lux), Ladin (ld)
- Context-based language switching
- Automatic fallback to English if translation unavailable
- Browser language detection

### 4. **Interactive Components**
- **Audio Player:** Play story narrations with playback speed controls
- **PDF Viewer:** Display activity worksheets
- **Image Carousel:** Navigate story pages
- **Progress Tracking:** Monitor activity completion

### 5. **Responsive Design**
- Mobile-first design approach
- Touch screen detection
- Adaptive layouts using Tailwind CSS
- Desktop and tablet optimizations

---

## Data Structure

### Activities Index (index.ts)

The main data file exports activities organized by pedagogical groups:

```typescript
export type ActivityGroupKey = "PC" | "ELS" | "ICAU" | "LA";

export const ACTIVITIES = {
  PC: {
    stories: [
      {
        id: "1",
        title: "Bobba's First Trip to Earth",
        sets: [
          [
            {
              id: "activity-1-1",
              description: "...",
              languages: {
                en: {
                  label: "English",
                  audioUrl: "/audio/...",
                  pdfUrl: "/activities/...",
                  title: "Activity Title"
                },
                fr: { /* French content */ },
                de: { /* German content */ },
                // ... more languages
              }
            }
          ]
        ]
      }
    ]
  },
  // ELS, ICAU, LA similar structure
};
```

### Story Metadata (stories.json)

```json
[
  {
    "id": "1",
    "slug": "bobbas-first-trip",
    "title": "Bobba's First Trip to Earth",
    "en": [{ /* story pages */ }],
    "fr": [{ /* story pages */ }],
    // ... more languages
  }
]
```

### Key Interfaces

```typescript
interface LanguageContent {
  label: string;
  audioUrl?: string;
  pdfUrl?: string;
  title?: string;
}

interface Activity {
  id: string;
  description: string;
  languages: Record<string, LanguageContent>;
}

interface StoryActivities {
  id: string;
  title: string;
  sets: Activity[][];
}
```

---

## Key Components

### 1. **LanguageProvider** (LanguageProvider.tsx)
Provides language context throughout the application using React Context API.

```typescript
export function LanguageProvider({ 
  children, 
  defaultLanguage = "en",
  availableLanguages,
  onLanguageChange
})
```

**Usage:**
```tsx
<LanguageProvider 
  defaultLanguage="en"
  availableLanguages={languages}
>
  {children}
</LanguageProvider>
```

### 2. **ActivityViewer** (ActivityViewer.tsx)
Displays activities with language-aware content switching.

**Props:**
- `activity: Activity` - Activity object
- `storyTitle: string` - Parent story title
- `storySlug: string` - Story URL slug

### 3. **StoryCarousel** (StoryCarousel.tsx)
Enables page-by-page navigation through stories with image and text display.

**Features:**
- Image gallery with text overlay
- Audio synchronization
- Full-screen mode
- Page indicators

### 4. **LanguageAwarePdfViewer** (LanguageAwarePdfViewer.tsx)
Displays PDFs based on selected language with automatic fallback.

### 5. **LanguageAudioPlayer** (LanguageAudioPlayer.tsx)
Plays audio content with playback speed control and progress tracking.

---

## Running the Platform

### Development Mode
```bash
npm run dev
```
- Starts dev server with hot reload
- Available at `http://localhost:3000`
- Turbopack for fast builds

### Production Build
```bash
npm run build
npm start
```

### Activity Synchronization
Synchronize activities from file system to data index:
```bash
npm run sync-activities
```

This script:
- Scans activities directory
- Detects new PDF files
- Updates index.ts with new activities
- Generates sync reports

---

## Development Workflow

### Adding a New Story

1. **Create story folder structure:**
   ```
   public/activities/story{N}/{GROUP}/
   ```

2. **Add story metadata** to stories.json:
   ```json
   {
     "id": "9",
     "slug": "new-story",
     "title": "New Story Title"
   }
   ```

3. **Create activity PDFs** and organize by language

(op)
4. **(not yet complete) Run sync script:**
   ```bash
   npm run sync-activities
   ```

### Adding a New Language

1. Update index.ts with new language code
2. Add translations to use-translation.tsx
3. Update language selector in components
4. Test language switching

### Component Development

1. Use TypeScript for type safety
2. Follow shadcn/ui component patterns
3. Use Tailwind CSS for styling
4. Test responsive behavior

### Translation Workflow

Translations are managed in:
- use-translation.tsx - UI translations
- button-translation.csv - Button labels
- Activity content in index.ts

---

## Deployment

### Vercel (Recommended for Next.js)

1. **Connect repository:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configure environment variables** in Vercel dashboard

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Self-Hosted

#### Prerequisites
- Node.js server
- Static file serving (nginx/apache)

#### Steps
1. Build application:
   ```bash
   npm run build
   ```

2. Deploy public to CDN (for static assets)

3. Run Next.js server:
   ```bash
   npm start
   ```

### Docker (Optional)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t agentive .
docker run -p 3000:3000 agentive
```

---

## Key Utilities

### `useTranslation()` Hook
```typescript
const { translate } = useTranslation(currentLanguage);
const translatedText = translate('key-name');
```

### `hasTouchScreen()` Utility
```typescript
import { hasTouchScreen } from '@/lib/utils';

if (hasTouchScreen()) {
  // Mobile-specific logic
}
```

### `cn()` Utility (Class Merging)
```typescript
import { cn } from '@/lib/utils';

const classes = cn('text-base', condition && 'text-lg');
```

---

## Project Principles

### 1. **Open Source**
- All code available under open licenses
- Community contributions welcome
- Transparent development process

### 2. **Accessibility**
- WCAG 2.1 AA compliance target
- Keyboard navigation support
- Screen reader optimization
- Color contrast standards

### 3. **Multilingualism**
- First-class support for multiple languages
- Respect for linguistic diversity
- Representation of minority languages

### 4. **Educational Quality**
- Evidence-based pedagogical approach
- Expert-reviewed content
- Age-appropriate materials
- Cultural sensitivity

### 5. **Privacy**
- No tracking of user data
- Privacy-preserving analytics (planned)
- GDPR compliant
- Data minimization principle

---

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Build Issues
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Language Not Appearing
1. Check index.ts for language support
2. Verify language code consistency
3. Run `npm run lint` to catch issues

### Activities Not Loading
1. Verify PDF file paths in index.ts
2. Check activities folder structure
3. Run `npm run sync-activities` to regenerate index

---

## Contributing

### Getting Started with Development
1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and test thoroughly
4. Submit pull request with description

### Code Style
- Follow ESLint configuration
- Use TypeScript for type safety
- Document complex functions
- Write meaningful commit messages

---

## Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **React Context API:** https://react.dev/reference/react/useContext

---

## License

AGENTIVE is open source and available under appropriate open licenses (Creative Commons for content, suitable software license for code). See LICENSE file for details.

---

## Contact & Support

For questions, feature requests, or bug reports:
- GitHub Issues: [Project Issues]
- Email: [agentive@wi.uni-muenster.de]
- Website: [https://agentive.uni-muenster.de]

---

**Last Updated:** Oct 2025  
**Version:** 0.1.0  
**Status:** Active Development