"use client"

import Link from 'next/link';
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';

// Available languages with flags
const availableLanguages = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "it", label: "Italiano", flag: "🇮🇹" },
  { id: "sv", label: "Slovenščina", flag: "🇸🇮" },
  { id: "lux", label: "Lëtzebuergesch", flag: "🇱🇺" },
  { id: "gr", label: "Ελληνικά", flag: "🇬🇷" },
];

export default function NavBar() {
  const { websiteLanguage, setWebsiteLanguage } = useWebsiteLanguage();

  const handleLanguageChange = (languageId: string) => {
    setWebsiteLanguage(languageId);
  };

  const currentLanguage = availableLanguages.find(l => l.id === websiteLanguage);

  return (
    <nav className='sticky top-0 z-50'>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto h-14 flex items-center">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-8 px-6">
              <img src='/LOGO.jpeg' alt="Agentive Logo" 
              className="h-8 w-auto" />
              <span className="font-bold sm:inline-block">AGENTIVE</span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="/dashboard">
                <TranslateButtons translationKey="multilingual-ressources" currentLanguage={websiteLanguage} />
              </a>
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="/about">
                <TranslateButtons translationKey="about-agentive" currentLanguage={websiteLanguage} />
              </a>
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="/team">
                <TranslateButtons translationKey="team" currentLanguage={websiteLanguage} />
              </a>
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="/blog">
                <TranslateButtons translationKey="blog" currentLanguage={websiteLanguage} />
              </a>
            </nav>
          </div>
          <div className="ml-auto flex items-center">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center px-3 py-2 rounded-md border text-sm bg-background hover:bg-accent hover:text-accent-foreground transition-colors mr-4">
                <span className="mr-2">{currentLanguage?.flag}</span>
                <span className="font-medium mr-1">{currentLanguage?.label}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {availableLanguages.map((language) => (
                  <DropdownMenuItem
                    key={language.id}
                    onClick={() => handleLanguageChange(language.id)}
                    className={`flex items-center px-3 py-2 cursor-pointer ${
                      language.id === websiteLanguage ? 'bg-accent' : ''
                    }`}
                  >
                    <span className="mr-3">{language.flag}</span>
                    <span>{language.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                aria-label="Toggle Menu"
                className="mr-2 px-3 py-1 border rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"/>
                  <line x1="4" x2="20" y1="6" y2="6"/>
                  <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
}