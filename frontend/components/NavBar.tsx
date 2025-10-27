"use client"

import Link from 'next/link';
import { ChevronDown, Plus, Minus, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';
import { useState, useEffect } from 'react';

// Available languages with country codes for flag-icons
const availableLanguages = [
  { id: "en", label: "English", countryCode: "gb" },
  { id: "de", label: "Deutsch", countryCode: "de" },
  { id: "fr", label: "Français", countryCode: "fr" },
  { id: "it", label: "Italiano", countryCode: "it" },
  { id: "sv", label: "Slovenščina", countryCode: "si" },
  { id: "lux", label: "Lëtzebuergesch", countryCode: "lu" },
  { id: "gr", label: "Ελληνικά", countryCode: "gr" },
];

export default function NavBar() {
  const { websiteLanguage, setWebsiteLanguage } = useWebsiteLanguage();
  const [scale, setScale] = useState(100);
  const [mounted, setMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved scale from localStorage
    const savedScale = localStorage.getItem('websiteScale');
    if (savedScale) {
      const scaleValue = parseInt(savedScale, 10);
      setScale(scaleValue);
      document.documentElement.style.fontSize = `${(scaleValue / 100) * 16}px`;
    }
  }, []);

  const handleLanguageChange = (languageId: string) => {
    setWebsiteLanguage(languageId);
  };

  const handleScaleChange = (direction: 'increase' | 'decrease') => {
    let newScale = scale;
    if (direction === 'increase' && scale < 150) {
      newScale = scale + 10;
    } else if (direction === 'decrease' && scale > 70) {
      newScale = scale - 10;
    }
    
    setScale(newScale);
    localStorage.setItem('websiteScale', newScale.toString());
    document.documentElement.style.fontSize = `${(newScale / 100) * 16}px`;
  };

  const handleNavigation = () => {
    setIsSheetOpen(false);
  };

  const currentLanguage = availableLanguages.find(l => l.id === websiteLanguage);

  if (!mounted) {
    return null;
  }

  return (
    <nav className='sticky top-0 z-50'>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto h-14 flex items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 px-6" onClick={handleNavigation}>
              <img src='/LOGO.jpeg' alt="Agentive Logo" 
              className="h-8 w-auto" />
              <span className="font-bold hidden sm:inline-block">AGENTIVE</span>
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
          <div className="ml-auto flex items-center gap-2">
            {/* Scale Controls - Visible on all screens */}
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => handleScaleChange('decrease')}
                disabled={scale <= 70}
                title="Decrease text size"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium min-w-[2.5rem] text-center">
                {scale}%
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => handleScaleChange('increase')}
                disabled={scale >= 150}
                title="Increase text size"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center px-3 py-2 rounded-md border text-sm bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                <span className={`fi fi-${currentLanguage?.countryCode || 'xx'} w-5 h-5 mr-2`} />
                <span className="font-medium mr-1 hidden sm:inline">{currentLanguage?.label}</span>
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
                    <span className={`fi fi-${language.countryCode} w-5 h-5 mr-3`} />
                    <span>{language.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 rounded hover:bg-accent transition-colors text-sm font-medium"
                    onClick={handleNavigation}
                  >
                    <TranslateButtons translationKey="multilingual-ressources" currentLanguage={websiteLanguage} />
                  </Link>
                  <Link 
                    href="/about" 
                    className="block px-4 py-2 rounded hover:bg-accent transition-colors text-sm font-medium"
                    onClick={handleNavigation}
                  >
                    <TranslateButtons translationKey="about-agentive" currentLanguage={websiteLanguage} />
                  </Link>
                  <Link 
                    href="/team" 
                    className="block px-4 py-2 rounded hover:bg-accent transition-colors text-sm font-medium"
                    onClick={handleNavigation}
                  >
                    <TranslateButtons translationKey="team" currentLanguage={websiteLanguage} />
                  </Link>
                  <Link 
                    href="/blog" 
                    className="block px-4 py-2 rounded hover:bg-accent transition-colors text-sm font-medium"
                    onClick={handleNavigation}
                  >
                    <TranslateButtons translationKey="blog" currentLanguage={websiteLanguage} />
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </nav>
  );
}