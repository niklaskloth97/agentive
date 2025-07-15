"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'
import { Menu, Moon, Sun } from 'lucide-react';
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const availableLanguages = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "it", label: "Italiano", flag: "🇮🇹" },
  { id: "es", label: "Español", flag: "🇪🇸" },
  // Add more as needed
];

export default function NavBar() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [websiteLanguage, setWebsiteLanguage] = useState("en");

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setIsDarkMode(savedTheme === 'dark');
        document.documentElement.setAttribute('data', savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    // Handle navigation with animation
    const handleNavigation = () => {
        setIsSheetOpen(false);
    };

    if (!mounted) {
        return null; // Prevent rendering until the theme is set
    }

    return (
        <nav className='sticky top-0'>
           <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto h-14 flex items-center">
                    <div className="flex md:flex">
                        <Link className="flex items-center space-x-8 px-6" href="/">
                            <img src='/images/agentive-logo.jpeg' alt="Agentive Logo" 
                            className="h-8 w-auto" />
                            <span className="font-bold sm:inline-block">AGENTIVE</span>
                        </Link>
                        {/* Hide navigation on mobile with hidden md:flex */}
                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                            <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/learning-material">Learning Material</Link>
                            <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/about">About AGENTIVE</Link>
                            <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/team">The Team</Link>
                            <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/blog">Blog</Link>
                        </nav>
                    </div>
                    <div className="ml-auto flex items-center">
                        {/* Language Selector */}
                        <TooltipProvider>
                          <div className="relative flex items-center mr-2">
                            <button
                              className="flex items-center px-2 py-1 rounded border text-base bg-muted cursor-not-allowed opacity-70"
                              disabled
                              tabIndex={-1}
                              aria-label="Website language selector"
                            >
                              <span className="mr-2">
                                {
                                  availableLanguages.find(l => l.id === websiteLanguage)?.flag || "🌐"
                                }
                              </span>
                              <span className="font-medium">
                                {
                                  availableLanguages.find(l => l.id === websiteLanguage)?.label || "Language"
                                }
                              </span>
                              <span className="ml-2 text-xs relative">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-gray-700 ml-1 border border-gray-300 cursor-help">
                                      <Info className="w-3 h-3" />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    Website translation is not yet implemented. Sorry for the inconvenience!
                                  </TooltipContent>
                                </Tooltip>
                              </span>
                            </button>
                          </div>
                        </TooltipProvider>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" 
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            <span className="sr-only">Toggle Theme</span>
                        </Button>
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="pl-">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                    <SheetDescription>
                                        Navigate through our educational platform.
                                    </SheetDescription>
                                </SheetHeader>
                                <nav className="flex flex-col gap-4 mt-4">
                                    <SheetClose asChild>
                                        <Link 
                                            className="transition-colors hover:text-foreground/80 text-foreground" 
                                            href="/learning-material"
                                            onClick={handleNavigation}
                                        >
                                            Learning Material
                                        </Link>
                                    </SheetClose>
                                    
                                    <SheetClose asChild>
                                        <Link 
                                            className="transition-colors hover:text-foreground/80 text-foreground" 
                                            href="/about"
                                            onClick={handleNavigation}
                                        >
                                            About AGENTIVE
                                        </Link>
                                    </SheetClose>
                                    
                                    <SheetClose asChild>
                                        <Link 
                                            className="transition-colors hover:text-foreground/80 text-foreground" 
                                            href="/team"
                                            onClick={handleNavigation}
                                        >
                                            The Team
                                        </Link>
                                    </SheetClose>
                                    
                                    <SheetClose asChild>
                                        <Link 
                                            className="transition-colors hover:text-foreground/80 text-foreground" 
                                            href="/blog"
                                            onClick={handleNavigation}
                                        >
                                            Blog
                                        </Link>
                                    </SheetClose>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </nav>
    );
}