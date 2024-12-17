"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showAuthForm, setShowAuthForm] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    return (
        <nav className='sticky top-0 z-50'>
            <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center max-w-7xl mx-auto">
                    <div className="flex md:flex">
                        <Link className="flex items-center space-x-8 px-6 " href="/">
                            <span className="font-bold sm:inline-block">AGENTIVE    </span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/learning-material">Learning Material</Link>
                            <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/about">About AGENTIVE</Link>
                            <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/team">The Team</Link>
                            <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/blog">Blog</Link>
                        </nav>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="ml-auto mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                                <SheetDescription>
                                    Navigate through our educational platform.
                                </SheetDescription>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 mt-4">
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/learning-material">Learning Material</Link>
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/about">About AGENTIVE</Link>
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/team">The Team</Link>
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/blog">Blog</Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
        </nav>
    );
}
