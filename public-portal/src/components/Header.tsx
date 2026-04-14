'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Le Parti', href: '/le-parti' },
    { label: 'Diaspora', href: '/diaspora' },
    { label: 'Blog', href: '/blog' },
    { label: 'Publications', href: '/publications' },
    { label: 'Événements', href: '/evenements' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-max px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl text-fds-green">
          FDS Monde
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-fds-green transition font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex gap-4">
          <Link href="/rejoindre" className="btn-secondary">
            Rejoindre
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-2xl"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-fds-light p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-gray-700 hover:text-fds-green"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/rejoindre" className="block mt-4 py-2 font-bold text-fds-green">
            Rejoindre le FDS
          </Link>
        </div>
      )}
    </header>
  )
}
