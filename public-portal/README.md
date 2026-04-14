# 🌍 Portail Public FDS France

Site officiel et vitrine du Front Démocratique et Social (FDS France).

## 🎯 Objectif

Créer un site moderne, crédible et engageant pour :
- Présenter le parti et ses valeurs
- Diffuser les analyses politiques et publications
- Attirer sympathisants et nouveaux membres
- Mobiliser la diaspora
- Faciliter l'engagement citoyen

## 📁 Structure

```
public-portal/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Accueil
│   │   ├── le-parti/page.tsx     # Le Parti
│   │   ├── blog/page.tsx         # Actualités
│   │   ├── publications/page.tsx # Publications
│   │   ├── diaspora/page.tsx     # Diaspora
│   │   ├── evenements/page.tsx   # Événements
│   │   ├── rejoindre/page.tsx    # Adhésion & Engagement
│   │   ├── contact/page.tsx      # Contact
│   │   ├── layout.tsx            # Layout global
│   │   └── globals.css           # Styles globaux
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Mission.tsx
│   │   ├── PresidentMessage.tsx
│   │   ├── FeaturedArticles.tsx
│   │   ├── CTASection.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── EventCard.tsx
│   │   └── PublicationCard.tsx
│   └── lib/
│       └── api.ts               # API client
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🌐 Pages Principales

### 1. **Accueil** (`/`)
- Présentation du FDS
- Message du Président
- Valeurs et vision
- Articles en vedette
- CTA (Rejoindre)

### 2. **Le Parti** (`/le-parti`)
- Histoire du mouvement
- Valeurs fondamentales
- Leadership (Président, SG, etc.)
- Pôles thématiques

### 3. **Blog / Actualités** (`/blog`)
- Articles par catégories
  - Économie
  - Diaspora
  - Social
  - Institutions
  - Citoyenneté
- Système de filtrage

### 4. **Publications** (`/publications`)
- Notes politiques
- Rapports
- Contributions des pôles
- Téléchargements PDF

### 5. **Diaspora** (`/diaspora`)
- Présentation des enjeux
- Initiatives du FDS
- Propositions politiques
- Témoignages
- Call-to-action

### 6. **Événements** (`/evenements`)
- Université d'été
- Cafés citoyens
- Journée de la diaspora
- Rencontres politiques

### 7. **Rejoindre** (`/rejoindre`)
- Formulaire d'adhésion
- Devenir volontaire
- Participer à un pôle
- S'inscrire à des événements

### 8. **Contact** (`/contact`)
- Formulaire de contact
- Informations pratiques
- Réseaux sociaux
- Localisation

## 🔗 Intégration avec la plateforme interne

Le portail public se connecte à l'API backend pour récupérer :

- **Articles** : Téléchargés depuis la plateforme interne, validés avant publication
- **Publications** : Notes politiques et rapports générés par les pôles
- **Événements** : Agenda d'événements publics
- **Utilisateurs** : Adhésions, volontaires, registrations

### Workflow de publication

1. Contenu créé en interne sur la plateforme
2. Marqué comme "À publier"
3. Validation par administrateur/éditeur
4. Publication automatique vers le portail public

## 🛠️ Installation

### Prérequis
- Node.js 20+
- npm 10+
- Backend (API) en cours d'exécution sur `http://localhost:4000`

### Setup

```bash
cd public-portal

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```

Le site sera disponible sur `http://localhost:3001`

## 📦 Commandes

```bash
npm run dev       # Mode développement (hot reload)
npm run build     # Build pour production
npm start         # Lancer le serveur (production)
npm run lint      # Vérifier le code
npm run type-check # Vérifier les types TypeScript
```

## 🎨 Design & Styling

- **Framework** : Tailwind CSS
- **Palette** : 
  - Primaire : `#10B981` (FDS Green)
  - Dark : `#1F2937`
  - Light : `#F3F4F6`
- **Responsive** : Mobile-first approach
- **Icônes** : React Icons

## 📱 Responsive Design

- Mobile : 375px et plus
- Tablet : 768px et plus
- Desktop : 1024px et plus

## 🔐 Sécurité

- Validation des formulaires côté client
- CSRF protection
- Rate limiting sur les formulaires
- Sanitization des inputs

## 🚀 Déploiement

### Production (Vercel)

```bash
# Déployer sur Vercel (recommandé pour Next.js)
npm install -g vercel
vercel
```

### Docker

```bash
# Construire l'image
docker build -t fds-public-portal .

# Lancer le conteneur
docker run -p 3001:3001 fds-public-portal
```

## 📊 Analytics & SEO

- Meta tags optimisés (title, description, og)
- Sitemap automatique
- Schema.org markup
- Google Analytics prêt

## 🌐 Multilingue

Structure de base pour support multilingue (FR / EN) :

```
i18n/
├── fr/
│   └── common.json
└── en/
    └── common.json
```

## 📈 Améliorations futures

- [ ] Système de newsletter avancé
- [ ] Blog multi-catégories avec tags
- [ ] Moteur de recherche
- [ ] Système de commentaires modérés
- [ ] Statistiques et analytics
- [ ] Intégration réseaux sociaux
- [ ] Live streaming d'événements
- [ ] Versions FR/EN/ES

## 🤝 Contribution

Pour contribuer au portail public, créez une branche et soumettez une PR.

```bash
git checkout -b feature/nom-fonctionnalite
# développer...
git commit -m "feat: description"
git push origin feature/nom-fonctionnalite
```

## 📞 Support

Pour les questions ou problèmes : contact@fds-france.org

---

*Portail public FDS France — Partie de la plateforme complète du FDS*
