"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        <svg viewBox="0 0 28 28" fill="none">
          <path d="M14 2L3 8v12l11 6 11-6V8L14 2z" stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,.08)"/>
          <path d="M9 9.5l5 2.5 5-2.5" stroke="#e8c76a" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Legal AI
      </Link>
      <div className="nav-links">
        <Link href="/" className={`nav-btn ${pathname === '/' ? 'active' : ''}`} id="nav-home">Home</Link>
        <Link href="/chat" className={`nav-btn ${pathname === '/chat' ? 'active' : ''}`} id="nav-chatbot">AI Chatbot</Link>
        <Link href="/dashboard" className={`nav-btn ${pathname === '/dashboard' ? 'active' : ''}`} id="nav-tracker">Case Tracker</Link>
        <Link href="/rights" className={`nav-btn ${pathname === '/rights' ? 'active' : ''}`} id="nav-rights">Rights Visualizer</Link>
        <Link href="/simplify" className={`nav-btn ${pathname === '/simplify' ? 'active' : ''}`} id="nav-simplifier">Doc Simplifier</Link>
        <Link href="/help" className={`nav-btn ${pathname === '/help' ? 'active' : ''}`} id="nav-help">Find Legal Help</Link>
        <Link href="/admin" className={`nav-btn ${pathname === '/admin' ? 'active' : ''}`} id="nav-admin">Admin</Link>
      </div>
    </nav>
  )
}
