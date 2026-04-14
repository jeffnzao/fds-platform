import Link from 'next/link'
import { FiDownload } from 'react-icons/fi'

export default function PublicationCard({ publication }: { publication: any }) {
  return (
    <Link href={`/publications/${publication.slug}`}>
      <div className="card h-full hover:shadow-xl transition cursor-pointer">
        <div className="text-sm text-fds-green font-bold mb-2 uppercase">{publication.type}</div>
        <h3 className="font-bold text-lg mb-3 line-clamp-2">{publication.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{publication.description}</p>
        <div className="flex items-center gap-2 text-fds-green">
          <FiDownload /> Lire
        </div>
      </div>
    </Link>
  )
}
