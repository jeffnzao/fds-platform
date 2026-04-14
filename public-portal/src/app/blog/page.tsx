'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getArticles } from '@/lib/api'
import ArticleCard from '@/components/ArticleCard'
import { FiSearch } from 'react-icons/fi'

export default function BlogPage() {
  const [articles, setArticles] = useState([])
  const [filter, setFilter] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles(filter || undefined)
        setArticles(data)
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [filter])

  const categories = [
    { id: 'ECONOMIE', label: 'Économie' },
    { id: 'DIASPORA', label: 'Diaspora' },
    { id: 'SOCIAL', label: 'Social' },
    { id: 'INSTITUTIONS', label: 'Institutions' },
    { id: 'CITOYENNETE', label: 'Citoyenneté' },
  ]

  return (
    <div className="section">
      <div className="container-max">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4">Actualités et Analyses</h1>
          <p className="text-xl text-gray-600">
            Découvrez les analyses politiques et actualités du FDS
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              !filter
                ? 'bg-fds-green text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filter === cat.id
                  ? 'bg-fds-green text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles */}
        {loading ? (
          <div className="text-center py-12">
            <p>Chargement des articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun article trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
