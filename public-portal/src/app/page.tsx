import Hero from '@/components/Hero'
import FeaturedArticles from '@/components/FeaturedArticles'
import Mission from '@/components/Mission'
import CTASection from '@/components/CTASection'
import PresidentMessage from '@/components/PresidentMessage'

export const metadata = {
  title: 'Accueil - FDS France',
  description: 'Bienvenue sur le site officiel du Front Démocratique et Social',
}

export default function Home() {
  return (
    <>
      <Hero />
      <PresidentMessage />
      <Mission />
      <FeaturedArticles />
      <CTASection />
    </>
  )
}
