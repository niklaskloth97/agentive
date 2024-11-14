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
    const [isRegister, setIsRegister] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
   
    const handleAuth = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const url = isLogin ? 'http://127.0.0.1:5000/login' : 'http://127.0.0.1:5000/register';
      const body = isLogin ? { email, password } : { fullName, email, password, confirmPassword };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
  
        const text = await response.text();
        console.log('Raw response:', text);
  
        const data = JSON.parse(text);
        console.log(data);
  
        if (data.success) {
          setIsLoggedIn(true);
          setShowAuthForm(false);
        } else {
          // Handle login or registration failure
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
        <nav className='px-4'>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center max-w-7xl mx-auto">
            <div className="mx-auto mr-4 hidden md:flex">
                <Link className="mx-auto mr-6 flex items-center space-x-2" href="/">
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
                    <Button variant="outline" onClick={() => setShowAuthForm(true)}>Login / Register</Button>
                )}
                </nav>
            </div>
            </div>
        </header>
        {showAuthForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-96">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{isLogin ? 'Login' : 'Register'}</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAuthForm(false)}>
                    <X className="h-4 w-4" />
                </Button>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                <Switch id="auth-mode" checked={!isLogin} onCheckedChange={() => setIsLogin(!isLogin)} />
                <Label htmlFor="auth-mode">{isLogin ? 'Switch to Register' : 'Switch to Login'}</Label>
                </div>
                <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                    <Input type="text" placeholder="Full Name" required />
                )}
                <Input type="email" placeholder="Email" required />
                <Input type="password" placeholder="Password" required />
                {!isLogin && (
                    <Input type="password" placeholder="Confirm Password" required />
                )}
                <Button type="submit" className="w-full">{isLogin ? 'Login' : 'Register'}</Button>
                </form>
                {isLogin && (
                <Button variant="link" className="mt-2 p-0" onClick={() => alert('Password reset functionality to be implemented')}>
                    Forgot password?
                </Button>
                )}
            </div>
            </div>
        )}
        </nav>
    );
}
