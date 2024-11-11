"use client";
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
import { Menu } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
    setShowLoginForm(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex pl-4" >
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">AGENTIVE</span>
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
              <Button variant="outline" size="icon" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
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
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <span className="sr-only">AGENTIVE</span>
              </Button>
            </div>
            <nav className="flex items-center">
              {isLoggedIn && (
                <Link className="mr-6" href="/dashboard">Dashboard</Link>
              )}
              {!isLoggedIn && (
                <Button variant="outline" onClick={() => setShowLoginForm(true)}>Login</Button>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      {showLoginForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="email" placeholder="Email" required />
              <Input type="password" placeholder="Password" required />
              <Button type="submit">Login</Button>
              <Button type="button" variant="outline" onClick={() => setShowLoginForm(false)}>Cancel</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}