import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-hero text-white py-24">
      <div className="container-max text-center">
        <h1 className="text-5xl font-bold mb-6">
          Construisons l'Afrique que nous méritons
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Le Front Démocratique et Social : Un mouvement de citoyens engagés pour la justice, 
          la transparence et le développement durable en Afrique.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/rejoindre" className="bg-white text-fds-green px-8 py-4 font-bold rounded-lg hover:bg-gray-100 transition">
            Rejoindre
          </Link>
          <Link href="/le-parti" className="border-2 border-white text-white px-8 py-4 font-bold rounded-lg hover:bg-white hover:text-fds-green transition">
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  )
}
