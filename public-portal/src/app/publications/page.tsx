'use client'

import { useEffect, useState } from 'react'
import { getPublications } from '@/lib/api'
import PublicationCard from '@/components/PublicationCard'

export default function PublicationsPage() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getPublications()
        setPublications(data)
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

  return (
    <div className="section">
      <div className="container-max">
        <h1 className="mb-4">Publications</h1>
        <p className="text-xl text-gray-600 mb-12">
          Notes politiques, rapports et contributions de nos pôles d'expertise
        </p>

        {loading ? (
          <p className="text-center">Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((pub: any) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
