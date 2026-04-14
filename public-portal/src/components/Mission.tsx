export default function Mission() {
  return (
    <section className="section bg-fds-light">
      <div className="container-max">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">Notre Vision</h2>
          <p className="text-lg text-gray-700 mb-6">
            Créer une Afrique prospère, juste et souveraine où tous les talents sont mobilisés, 
            où la démocratie est vivante, où la transparence règne et où la digni
té humaine est respectée.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="card">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="font-bold mb-2">Justice</h3>
              <p className="text-gray-600">Égalité des droits et des chances pour tous</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-bold mb-2">Durabilité</h3>
              <p className="text-gray-600">Développement écologique et responsable</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold mb-2">Solidarité</h3>
              <p className="text-gray-600">Coopération et engagement communautaire</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
