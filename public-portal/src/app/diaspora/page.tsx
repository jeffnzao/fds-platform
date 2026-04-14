export default function DiasporaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section">
        <div className="container-max">
          <h1 className="mb-4">Diaspora & Retour</h1>
          <p className="text-xl">Mobiliser nos talents dispersés pour façonner notre avenir</p>
        </div>
      </section>

      {/* Contenu */}
      <div className="section">
        <div className="container-max">
          {/* Enjeux */}
          <section className="mb-16">
            <h2 className="mb-8">Enjeux de la Diaspora</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg text-fds-green mb-4">💼 Emploi & Entrepreneuriat</h3>
                <p className="text-gray-700">
                  Plus de 50 000 Gabonais et Camerounais travaillent en France avec expertise reconnue. 
                  Comment créer des connexions productives entre cette diaspora et les projets gouvernementaux ?
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-fds-green mb-4">🎓 Bourses & Formation</h3>
                <p className="text-gray-700">
                  L'accès aux formations supérieures en Europe est vital pour notre compétitivité. 
                  Le FDS propose des programmes de bourses et d'échanges académiques.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-fds-green mb-4">🏡 Retour & Réintégration</h3>
                <p className="text-gray-700">
                  Permettre le retour dans la dignité aux talents qui souhaitent contribuer au développement du pays. 
                  Rôles de consultants, fondateurs de startups, ou agents de changement.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-fds-green mb-4">💰 Investissements</h3>
                <p className="text-gray-700">
                  La diaspora dispose de capacités financières: fonds d'investissement privés, coopératives, 
                  partenariats pour financer des projets porteurs.
                </p>
              </div>
            </div>
          </section>

          {/* Propositions */}
          <section className="mb-16">
            <h2 className="mb-8">Propositions du FDS</h2>
            <div className="space-y-4">
              {[
                { num: '1', title: 'Portail de Talents Diaspora', desc: 'Plateforme connectant nos diaspora avec les gouvernements et entreprises locales' },
                { num: '2', title: 'Missions courtes de 1-3 mois', desc: 'Programme de volontariat rémunéré pour implémenter des projets d\'expertise' },
                { num: '3', title: 'Fonds Diaspora 500M$', desc: 'Capital dédié aux investissements diaspora en infrastructure et innovation' },
                { num: '4', title: 'Ambassadeurs FDS', desc: 'Réseau d\'ambassadeurs dans chaque pays majeur de la diaspora' },
                { num: '5', title: 'Centres de rapatriement', desc: 'Structures d\'accueil et d\'intégration pour les retours permanents' },
              ].map((prop) => (
                <div key={prop.num} className="card border-l-4 border-fds-green">
                  <div className="flex gap-4">
                    <div className="text-3xl font-bold text-fds-green">{prop.num}</div>
                    <div>
                      <h3 className="font-bold text-lg">{prop.title}</h3>
                      <p className="text-gray-600">{prop.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Témoignages */}
          <section className="mb-16">
            <h2 className="mb-8">Témoignages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Jean-Baptiste M.', role: 'Entrepreneur en France', text: 'Le FDS comprend que nous voulons contribuer. C\'est motivant d\'entendre enfin ce discours.' },
                { name: 'Marie-Dominique K.', role: 'Étudiante en Belgique', text: 'Un programme de bourses et d\'échanges serait transformateur pour les jeunes talents.' },
              ].map((test, i) => (
                <div key={i} className="card bg-fds-light italic">
                  <p className="mb-4">"{test.text}"</p>
                  <p className="font-bold">{test.name}</p>
                  <p className="text-sm text-gray-600">{test.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Rejoignez le mouvement</h3>
            <p className="text-gray-600 mb-6">
              Vous êtes en diaspora ? Partagez votre histoire et vos idées
            </p>
            <button className="btn-primary">
              Je veux m'engager
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
