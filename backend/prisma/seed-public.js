// prisma/seed-public.js — Contenu public (articles, publications, événements)

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedPublicContent() {
  console.log('🌍 Seeding contenu public FDS...');

  // Récupérer un utilisateur admin
  const admin = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' },
  });

  const france = await prisma.country.findFirst({
    where: { code: 'FR' },
  });

  if (!admin || !france) {
    console.log('❌ Administrateur ou France non trouvés');
    return;
  }

  // ─── ARTICLES ─────────────────────────────────────────────

  const articles = [
    {
      title: 'La diaspora : un atout stratégique pour la France et le Gabon',
      slug: 'diaspora-atout-strategique',
      excerpt: 'Comment mobiliser nos talents dispersés à travers le monde pour une coopération Sud-Nord bénéfique.',
      content: `# La diaspora : un atout stratégique

La communauté gabonaise en France représente plus de 50 000 individus fortement intégrés dans le tissu économique et universitaire français. Le FDS considère cette diaspora non comme une perte, mais comme une opportunité de créer des ponts.

## Enjeux majeurs

### Emploi et entrepreneuriat
- Créer des connexions entre nos diaspora entrepreneurs et les initiatives au Gabon
- Faciliter le transfert technologique et les investissements
- Valoriser les compétences acquises en France

### Retour et réintégration
- Programmes de retour progressifs
- Rôles de consultants à distance
- Création de startups binationales

### Bourses et formation
- Faciliter l'accès à des formations supérieures en France
- Créer des échanges académiques
- Financer des projets d'excellence

## Propositions du FDS

1. **Créer un portail de talents** reliant la diaspora aux projets locaux
2. **Organiser des missions courtes** 1-3 mois pour impulser des projets
3. **Créer un fonds diaspora** pour les investissements
4. **Former un réseau diplomatique alternatif** d'ambassadeurs FDS

Le potentiel est énorme. Nos compatriotes en France sont prêts à s'engager. C'est à nous de créer les conditions de cette mobilisation.`,
      category: 'DIASPORA',
      imageUrl: '/images/diaspora-hero.jpg',
      featured: true,
    },
    {
      title: 'Économie verte : les secteurs d\'avenir pour le Gabon',
      slug: 'economie-verte-gabon',
      excerpt: 'Le Gabon dispose de 80% de forêts tropicales. Comment transformer ce patrimoine en richesse économique durable ?',
      content: `# Économie verte : les secteurs d'avenir

Le Gabon ne peut pas se contenter du pétrole. Notre richesse réside dans nos écosystèmes exceptionnels.

## Secteurs prioritaires

### 1. Agroforesterie
- Cacao et café de qualité premium
- Fruits exotiques biologiques
- Apiculture soutenable

### 2. Tourisme écologique
- Réserves naturelles aménagées
- Écotourisme haut de gamme
- Conservation et emplois locaux

### 3. Énergies renouvelables
- Hydroélectricité (ressources abondantes)
- Énergie solaire pour les zones rurales
- Transition énergétique progressive

### 4. Économie circulaire
- Valorisation des déchets agricoles
- Artisanat de qualité
- Technologies environnementales

## Positions du FDS

- Interdire l'exploitation forestière destructrice
- Créer une agence de développement durable
- Former des cadres en économie verte
- Attirer des investissements responsables

L'avenir du Gabon est vert. C'est une opportunité économique AND une responsabilité environnementale.`,
      category: 'ECONOMIE',
      imageUrl: '/images/economie-verte.jpg',
      featured: true,
    },
    {
      title: 'Santé universelle : un droit, pas un privilège',
      slug: 'sante-universelle',
      excerpt: 'Nous proposons un système de santé équitable et accessible à tous les Gabonais.',
      content: `# Vers une couverture santé universelle

## Diagnostic actuel
- 60% des Gabonais sans accès régulier aux soins
- Équipements vétustes, manque de personnel
- Financement dépendant des importations pétrolières

## Plan du FDS

### 1. Restructurer le système
- Hôpitaux régionaux modernisés
- Cliniques mobiles pour zones rurales
- Formation accélérée de personnel médical

### 2. Financer durablement
- Cotisations sociales équitables
- Fonds souverains dédiés
- Partenariats internationaux

### 3. Prévention
- Campagnes santé publique
- Accès aux vaccins gratuits
- Éducation nutritionnelle

### 4. Médicaments
- Pharmacopée locale développée
- Prix régulés
- Génériques accessibles

La santé est un droit fondamental. Aucun Gabonais n'en sera exclu sous notre gouvernance.`,
      category: 'SOCIAL',
      imageUrl: '/images/sante.jpg',
      featured: false,
    },
    {
      title: 'Intelligence artificielle : un enjeu de souveraineté pour l\'Afrique',
      slug: 'ia-souverainete-africaine',
      excerpt: 'L\'IA n\'est pas un luxe. C\'est un outil stratégique pour notre développement.',
      content: `# IA et souveraineté africaine

## Le contexte
L'IA redéfinit les économies mondiales. L'Afrique risque de rester dépendante si elle n'agit pas maintenant.

## Secteurs d'application

### 1. Agriculture intelligente
- Prévision des récoltes par IA
- Optimisation des rendements
- Détection des maladies des cultures

### 2. Santé diagnostique
- Détection du cancer par IA
- Épidémiologie prédictive
- Robotique chirurgicale

### 3. Gouvernance
- Analyse des données publiques
- Fraud detection
- Services administratifs numériques

## Propositions du FDS

- Créer une Académie IA Gabon
- Investir dans les startups tech africaines
- Former 1000 experts en 3 ans
- Développer des modèles IA adaptés aux données africaines

L'IA n'est pas un ennemi des emplois : elle peut les transformer et les multiplier.`,
      category: 'CITOYENNETE',
      imageUrl: '/images/ia-Africa.jpg',
      featured: false,
    },
    {
      title: 'Les institutions gabonaises : une réforme urgente',
      slug: 'reforme-institutions',
      excerpt: 'Renforcer la démocratie, la transparence et la redevabilité des gouvernants.',
      content: `# Réforme constitutionnelle et institutionnelle

## Enjeux de la démocratie gabonaise

La démocratie gabonaise souffre de faiblesses structurelles qui doivent être adressées.

## Propositions de réformes

### 1. Séparation des pouvoirs
- Parlement avec véritable pouvoir législatif
- Cour constitutionnelle indépendante
- Collectivités locales décentralisées

### 2. Transparence budgétaire
- Publication des budgets publics
- Audit indépendant des finances
- Lutte contre la corruption systématique

### 3. Droits et libertés
- Liberté de presse garantie
- Droit de manifestation respecté
- Justice indépendante

### 4. Alternance du pouvoir
- Limitation des mandats présidentiels (2 termes)
- Scrutin proportionnel
- Égalité d'accès aux médias

## Vision du FDS

Nous croyons à une démocratie vraie, où les citoyens règnent et où les gouvernants sont redevables.`,
      category: 'INSTITUTIONS',
      imageUrl: '/images/institutions.jpg',
      featured: false,
    },
  ];

  // Créer les articles
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        ...article,
        authorId: admin.id,
        status: 'PUBLIE',
        publishedAt: new Date(),
      },
    });
  }

  console.log(`✅ ${articles.length} articles créés`);

  // ─── PUBLICATIONS ──────────────────────────────────────

  const publications = [
    {
      title: 'Note politique : Stratégie diaspora 2026-2030',
      slug: 'note-diaspora-2026',
      description: 'Document politique détaillé sur la mobilisation de la diaspora gabonaise',
      content: `# STRATÉGIE DIASPORA 2026-2030

## Contexte
La diaspora gabonaise constitue un atout majeur non encore mobilisé pour le développement national.

## Objectifs
1. Créer 500 connexions diaspora-Gabon
2. Générer 100M$ d'investissements
3. Faciliter le retour de 5000 talents

## Actions

### Phase 1 (2026)
- Créer un portail de talents
- Organiser 4 missions expertise
- Lancer fonds diaspora (10M$)

### Phase 2 (2027-2028)
- Expansion à 5 pays européens
- Startup binationales incubées
- Formations continues

### Phase 3 (2029-2030)
- Retours massifs programmés
- Intégration aux structures politiques
- Impact mesurable

## Budget
Investissement initial : 50M$ sur 5 ans
Retour attendu : 500M$ (10x multiplier)

*Document approuvé par le Bureau politique*`,
      type: 'NOTE_POLITIQUE',
      imageUrl: '/images/diaspora-note.jpg',
    },
    {
      title: 'Rapport : État du secteur énergétique africain',
      slug: 'rapport-energie-afrique',
      description: 'Analyse comparative de la transition énergétique en Afrique centrale',
      content: `# ÉTAT DU SECTEUR ÉNERGÉTIQUE AFRICAIN

## Synthèse Executive

L'Afrique centrale dispose de 60% de l'eau douce africaine mais n'en exploite que 5% énergétiquement.

## Données clés
- Gabon : 80 GW de potentiel hydroélectrique (utilisé : 2 GW)
- Congo : Potentiel similaire, quasi inexploité
- Cameroun : Avances technologiques à partager

## Recommandations

1. **Créer un OPEC énergétique africain**
   - Pooler les capacités
   - Exporter vers l'Europe
   - Revenus énergétiques non pétroliers

2. **Investir dans le stockage**
   - Batteries de dernière génération
   - Lissage de la production

3. **Intégration régionale**
   - interconnexion électrique
   - Échanges technologiques

4. **Formation**
   - 10 000 techniciens/an
   - Universités de l'énergie

## Conclusion
Le potentiel énergétique africain est un levier de pouvoir géopolitique.`,
      type: 'RAPPORT',
      imageUrl: '/images/energie-rapport.jpg',
    },
  ];

  for (const pub of publications) {
    await prisma.publication.upsert({
      where: { slug: pub.slug },
      update: {},
      create: {
        ...pub,
        authorId: admin.id,
        status: 'PUBLIE',
        publishedAt: new Date(),
      },
    });
  }

  console.log(`✅ ${publications.length} publications créées`);

  // ─── ÉVÉNEMENTS PUBLICS ───────────────────────────────

  const events = [
    {
      title: 'Université d\'été FDS 2026 - Châteauroux',
      slug: 'universite-ete-2026',
      description: 'Grande rencontre annuelle des militants FDS avec débats politiques et networking',
      location: 'Châteauroux, France',
      startDate: new Date('2026-08-15'),
      endDate: new Date('2026-08-20'),
      imageUrl: '/images/universite-ete.jpg',
      featured: true,
      registrationLink: 'https://forms.example.com/ete2026',
    },
    {
      title: 'Café citoyen : Emploi et diaspora',
      slug: 'cafe-citoyen-emploi',
      description: 'Débat informel sur les enjeux d\'emploi pour la jeunesse francophones',
      location: 'Paris 13e',
      startDate: new Date('2026-05-10'),
      imageUrl: '/images/cafe-citoyen.jpg',
      featured: false,
      registrationLink: 'https://forms.example.com/cafe-emploi',
    },
    {
      title: 'Journée nationale de la diaspora',
      slug: 'journee-diaspora',
      description: 'Célébration et mobilisation de la diaspora gabonaise en France',
      location: 'Multisite - 10 villes',
      startDate: new Date('2026-06-21'),
      imageUrl: '/images/journee-diaspora.jpg',
      featured: true,
      registrationLink: 'https://forms.example.com/diaspora2026',
    },
  ];

  for (const event of events) {
    await prisma.publicEvent.upsert({
      where: { slug: event.slug },
      update: {},
      create: {
        ...event,
        creatorId: admin.id,
        status: 'PUBLIE',
        publishedAt: new Date(),
      },
    });
  }

  console.log(`✅ ${events.length} événements publics créés`);

  // ─── NEWSLETTER ────────────────────────────────────────

  const subscribers = [
    { email: 'alice@example.com', name: 'Alice Martin', language: 'fr' },
    { email: 'bob.smith@example.com', name: 'Bob Smith', language: 'en' },
  ];

  for (const sub of subscribers) {
    await prisma.newsletterSubscriber.upsert({
      where: { email: sub.email },
      update: {},
      create: sub,
    });
  }

  console.log(`✅ ${subscribers.length} abonnés newsletter créés`);

  console.log('\n✅ Contenu public seeded avec succès !');
}

seedPublicContent()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
