export default function PresidentMessage() {
  return (
    <section className="section">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-300 aspect-square rounded-lg"></div>
          <div>
            <p className="text-sm text-fds-green font-bold mb-2">MESSAGE</p>
            <h2 className="mb-6">Mot du Président</h2>
            <p className="text-lg text-gray-700 mb-6">
              "Nous vivons un moment charnière pour l'Afrique. Les enjeux sont clairs : créer des emplois, 
              investir en éducation, valoriser nos talents dispersés. Mais surtout, faire confiance à nos citoyens."
            </p>
            <p className="text-lg text-gray-700 mb-6">
              "Le FDS n'est pas un parti comme les autres. C'est un mouvement de citoyens qui croient que 
              la politique peut être au service de l'intérêt général plutôt qu'à l'accumulation du pouvoir."
            </p>
            <p className="text-lg text-gray-700">
              "Je vous invite à nous rejoindre dans cette aventure. Ensemble, nous construisons l'Afrique 
              que nous méritons - juste, prospère, souveraine."
            </p>
            <p className="mt-8 font-bold">— Président FDS</p>
          </div>
        </div>
      </div>
    </section>
  )
}
