import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { FiMapPin, FiCalendar } from 'react-icons/fi'

export default function EventCard({ event }: { event: any }) {
  const date = new Date(event.startDate)
  const formatted = format(date, 'd MMMM yyyy', { locale: fr })
  
  return (
    <Link href={`/evenements/${event.slug}`}>
      <div className="card h-full hover:shadow-xl transition cursor-pointer overflow-hidden">
        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover mb-4" />
        )}
        <h3 className="font-bold text-lg mb-4">{event.title}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-fds-green" />
            {formatted}
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <FiMapPin className="text-fds-green" />
              {event.location}
            </div>
          )}
        </div>
        <div className="mt-4">
          <span className="text-fds-green font-bold">En savoir plus →</span>
        </div>
      </div>
    </Link>
  )
}
