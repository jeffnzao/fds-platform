'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPublicEvents } from '@/lib/api'
import EventCard from '@/components/EventCard'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getPublicEvents()
        setEvents(data)
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="section">
      <div className="container-max">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4">Événements</h1>
          <p className="text-xl text-gray-600">
            Rejoignez nos événements et participez à la vie du FDS
          </p>
        </div>

        {/* Events */}
        {loading ? (
          <div className="text-center py-12">
            <p>Chargement des événements...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun événement à venir</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
