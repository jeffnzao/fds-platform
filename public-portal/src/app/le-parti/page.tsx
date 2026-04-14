export default function PartPage() {
  return (
    <div className="section">
      <div className="container-max">
        <h1 className="mb-8">Le Front Démocratique et Social</h1>

        {/* Histoire */}
        <section className="mb-16">
          <h2 className="mb-6">Notre Histoire</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              Le Front Démocratique et Social est un parti politique fondé sur les valeurs de justice sociale, 
              de transparence et de développement durable. Depuis sa création, le FDS œuvre pour la modernisation 
              politique de la Francophonie africaine.
            </p>
            <p className="text-lg text-gray-700">
              En tant qu'espace de rassemblement des talents et des bonnes volontés, le FDS propose une alternative crédible 
              basée sur la compétence, l'intégrité et l'engagement civique.
            </p>
          </div>
        </section>

        {/* Valeurs */}
        <section className="mb-16">
          <h2 className="mb-8">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '⚖️', title: 'Justice Sociale', description: 'Égalité des chances pour tous' },
              { icon: '🤝', title: 'Solidarité', description: 'Entraide et coopération' },
              { icon: '💡', title: 'Innovation', description: 'Solutions modernes et créatives' },
              { icon: '🌍', title: 'Durabilité', description: 'Développement écologique' },
              { icon: '📢', title: 'Transparence', description: 'Gouvernance responsable' },
              { icon: '👥', title: 'Inclusion', description: 'Tous les talents bienvenues' },
            ].map((val, i) => (
              <div key={i} className="card text-center">
                <div className="text-5xl mb-4">{val.icon}</div>
                <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                <p className="text-gray-600">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="mb-16">
          <h2 className="mb-8">Direction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: 'Président', name: 'À déterminer' },
              { role: 'Secrétaire Général', name: 'À déterminer' },
              { role: 'Trésorier National', name: 'À déterminer' },
            ].map((member, i) => (
              <div key={i} className="card">
                <h3 className="font-bold text-lg">{member.role}</h3>
                <p className="text-fds-green">{member.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pôles */}
        <section>
          <h2 className="mb-8">Nos Pôles Thématiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Diaspora & Retour',
              'Économie & Entrepreneuriat',
              'Social & Solidarité',
              'Communication',
              'Citoyenneté & Droits',
              'Institutions',
            ].map((pole) => (
              <div key={pole} className="bg-fds-light p-4 rounded-lg">
                <h3 className="font-bold text-fds-green">{pole}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
