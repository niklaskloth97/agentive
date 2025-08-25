"use client"
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
import { Menu, Moon, Sun } from 'lucide-react'

export default function NavBar() {
    // Default to 'light' theme on the server and initial client render
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // This effect runs only on the client, after the component has mounted
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const handleNavigation = () => {
        setIsSheetOpen(false);
    };

    // Render the full component structure on both server and client.
    // The button's content will just be different until mounted.
    return (
        <nav className='sticky top-0 z-50'>
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto h-14 flex items-center">
                    <div className="flex md:flex">
                        <a className="flex items-center space-x-8 px-6" href="/">
                            <img src='/images/agentive-logo.jpeg' alt="Agentive Logo" 
                            className="h-8 w-auto" />
                            <span className="font-bold sm:inline-block">AGENTIVE</span>
                        </a>
                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                            <a className="transition-colors hover:text-foreground/80 text-foreground" href="/learning-material">Learning Material</a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground" href="/about">About AGENTIVE</a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground" href="/team">The Team</a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground" href="/blog">Blog</a>
                        </nav>
                    </div>
                    <div className="ml-auto flex items-center">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" 
                            onClick={toggleTheme}
                            // Disable the button until the component is mounted to prevent hydration mismatch clicks
                            disabled={!mounted}
                        >
                            {/* Render a placeholder or the default icon on the server */}
                            {/* Once mounted, correctly show the Sun or Moon icon */}
                            {mounted ? (theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : <Moon className="h-5 w-5" />}
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
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                    <SheetDescription>
                                        Navigate through our educational platform.
                                    </SheetDescription>
                                </SheetHeader>
                                <nav className="flex flex-col gap-4 mt-4">
                                    <SheetClose asChild><a href="/learning-material" onClick={handleNavigation}>Learning Material</a></SheetClose>
                                    <SheetClose asChild><a href="/about" onClick={handleNavigation}>About AGENTIVE</a></SheetClose>
                                    <SheetClose asChild><a href="/team" onClick={handleNavigation}>The Team</a></SheetClose>
                                    <SheetClose asChild><a href="/blog" onClick={handleNavigation}>Blog</a></SheetClose>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </nav>
    );
}
