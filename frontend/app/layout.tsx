"use client"
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider"
import { WebsiteLanguageProvider } from '@/contexts/WebsiteLanguageContext';
import "flag-icons/css/flag-icons.min.css";
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css" />

//import { AppSidebar } from "@/app/dashboard/app-sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="white"
          
          disableTransitionOnChange
        >
          <WebsiteLanguageProvider>
            <NavBar />
            <main className="flex-grow overflow-y-auto">
            <div className='mx-auto pr-4'>
                {children}
              </div>
            </main>
            <Footer />
          </WebsiteLanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}