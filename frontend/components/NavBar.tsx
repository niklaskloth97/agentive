"use client"

import Link from 'next/link';



export default function NavBar() {
    // Note: The mobile menu and theme-toggle logic has been simplified 
    // to focus on the primary layout issue.

    return (
        // The z-index (z-50) is now on the sticky nav element.
        <nav className='sticky top-0 z-50'>
            {/* The z-index has been removed from the header itself. */}
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
                            <a className="transition-colors hover:text-foreground/80 text-foreground" href="/learning-material">Learning Material</a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground" href="/about">About AGENTIVE</a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground" href="/team">The Team</a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground" href="/blog">Blog</a>
                        </nav>
                    </div>
                    <div className="ml-auto flex items-center md:hidden">
                         {/* Placeholder for mobile menu button */}
                        <button 
                            aria-label="Toggle Menu"
                            className="mr-2 px-3 py-1 border rounded"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                        </button>
                    </div>
                </div>
            </header>
        </nav>
    );
}
