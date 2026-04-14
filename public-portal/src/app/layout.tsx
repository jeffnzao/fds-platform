import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'FDS France - Front Démocratique et Social',
  description: 'Plateforme politique pour le Front Démocratique et Social - Gabon & France',
  keywords: ['politique', 'FDS', 'Gabon', 'France', 'diaspora'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://fds-france.org',
    title: 'FDS France',
    description: 'Front Démocratique et Social',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
