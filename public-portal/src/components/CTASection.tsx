import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="bg-fds-dark text-white section">
      <div className="container-max text-center">
        <h2 className="text-white mb-6">Vous partagez nos valeurs ?</h2>
        <p className="text-xl mb-8 text-gray-300">Rejoignez le mouvement et transformez votre passion en action</p>
        <Link href="/rejoindre" className="btn-primary bg-white text-fds-dark hover:bg-gray-200">
          Devenir membre du FDS
        </Link>
      </div>
    </section>
  )
}
