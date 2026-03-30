import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { Scale } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Legal AI - Instant Legal Assistance",
  description: "Your personal legal assistant powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
            <Link href="/" className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-teal-600" />
              <span className="font-bold text-xl text-navy-900">Legal AI</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/chat" className="transition-colors hover:text-teal-600 text-slate-600">Chat Assistant</Link>
              <Link href="/simplify" className="transition-colors hover:text-teal-600 text-slate-600">Simplifier</Link>
              <Link href="/rights" className="transition-colors hover:text-teal-600 text-slate-600">Rights</Link>
              <Link href="/help" className="transition-colors hover:text-teal-600 text-slate-600">Legal Help</Link>
              <Link href="/dashboard" className="transition-colors hover:text-teal-600 text-slate-600">Dashboard</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/chat" className="text-sm font-medium hover:underline underline-offset-4">Sign In</Link>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col w-full h-full">
          {children}
        </main>
        <footer className="border-t py-6 bg-slate-100 mt-auto">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4 mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-teal-600" />
              <p className="text-sm leading-loose text-slate-600">
                Built to make justice accessible to everyone in India.
              </p>
            </div>
            <p className="text-sm text-slate-600">
              © 2026 Legal AI. This is a hackathon project. Not actual legal advice.
            </p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
