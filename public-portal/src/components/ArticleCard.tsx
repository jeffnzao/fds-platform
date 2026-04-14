import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function ArticleCard({ article }: { article: any }) {
  const date = new Date(article.publishedAt || article.createdAt)
  const formatted = format(date, 'd MMMM yyyy', { locale: fr })
  
  return (
    <Link href={`/blog/${article.slug}`}>
      <div className="card h-full hover:shadow-xl transition cursor-pointer overflow-hidden">
        {article.imageUrl && (
          <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover mb-4" />
        )}
        <div className="text-sm text-fds-green font-bold mb-2">{article.category}</div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="text-xs text-gray-500">{formatted}</div>
      </div>
    </Link>
  )
}
