'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFeaturedArticles } from '@/lib/api'
import ArticleCard from './ArticleCard'

export default function FeaturedArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getFeaturedArticles()
        setArticles(data.slice(0, 3))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading) return <div className="section">Chargement...</div>

  return (
    <section className="section bg-fds-light">
      <div className="container-max">
        <div className="mb-12 flex justify-between items-center">
          <h2>Derniers Articles</h2>
          <Link href="/blog" className="text-fds-green font-bold hover:underline">
            Tous les articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article: any) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
