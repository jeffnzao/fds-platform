# 🟢 FDS Platform — Guide complet

Plateforme web interne du **Front Démocratique et Social** (Gabon & France).  
Stack : **Node.js + Express + Prisma + PostgreSQL + React + TypeScript + Vite + Docker**

## 🎯 Architecture globale

L'application FDS est composée de **deux parties distinctes mais intégrées** :

1. **🔒 Plateforme Interne** : Espace de travail collaboratif pour les membres
2. **🌍 Portail Public** : Site officiel du parti accessible aux citoyens

---

## 📁 Structure du projet

```
fds-platform/
├── backend/                  # API Node.js + Express (partagée interne + public)
│   ├── prisma/
│   │   ├── schema.prisma     # Schéma base de données
│   │   ├── seed.js           # Données initiales
│   │   └── seed-public.js    # Contenu public
│   ├── src/
│   │   ├── controllers/      # Logique métier
│   │   ├── middleware/       # Auth, validation, erreurs
│   │   ├── routes/           # Endpoints API
│   │   │   ├── public.routes.js  # Routes publiques
│   │   │   ├── auth.routes.js
│   │   │   └── ...
│   │   ├── services/         # WebSocket, email, MinIO
│   │   ├── utils/            # Prisma client, logger
│   │   └── index.js          # Point d'entrée
│   ├── Dockerfile
│   └── package.json
├── frontend/                 # Plateforme Interne (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── public-portal/            # Portail Public (Next.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Accueil
│   │   │   ├── le-parti/
│   │   │   ├── blog/
│   │   │   ├── publications/
│   │   │   ├── diaspora/
│   │   │   ├── evenements/
│   │   │   ├── rejoindre/
│   │   │   ├── contact/
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   └── lib/
│   │       └── api.ts
│   ├── package.json
│   ├── next.config.js
│   └── README.md
├── nginx/
│   └── nginx.conf            # Reverse proxy (interne + public)
├── scripts/
│   ├── setup.sh              # Script d'installation
│   └── init.sql
├── docker-compose.yml        # Services (PostgreSQL, Redis, MinIO)
└── .env.example

---

## 🚀 Démarrage rapide (développement local)

### Prérequis

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| Node.js | 20+ | `node --version` |
| npm | 9+ | `npm --version` |
| Docker Desktop | 24+ | `docker --version` |
| Git | any | `git --version` |

---

### Étape 1 — Cloner / copier le projet

```bash
# Si vous utilisez Git
git clone <votre-repo> fds-platform
cd fds-platform

# Ou simplement être dans le dossier du projet
cd fds-platform
```

---

### Étape 2 — Configurer les variables d'environnement

```bash
cp .env.example .env
```

Ouvrez `.env` et vérifiez / modifiez les valeurs :

```env
# En développement, les valeurs par défaut suffisent.
# En production, CHANGEZ ABSOLUMENT ces valeurs :

POSTGRES_PASSWORD=fds_secret_2024       # → mot de passe fort
JWT_SECRET=change_this...               # → openssl rand -base64 64
JWT_REFRESH_SECRET=change_this...       # → openssl rand -base64 64
MINIO_ROOT_PASSWORD=minio_secret_2024   # → mot de passe fort
```

---

### Étape 3 — Setup automatique (recommandé)

```bash
bash scripts/setup.sh
```

Ce script fait **tout automatiquement** :
- ✅ Vérifie les prérequis (Node, Docker)
- ✅ Copie `.env` si manquant
- ✅ Installe les dépendances npm (backend + frontend)
- ✅ Démarre PostgreSQL, Redis et MinIO via Docker
- ✅ Applique les migrations Prisma
- ✅ Insère les données initiales (pays, pôles, comptes test)

---

### Étape 4 — Lancer les serveurs de développement

Ouvrez **3 terminaux** :

**Terminal 1 — Backend (API) :**
```bash
cd backend
npm run dev
# → API disponible sur http://localhost:4000
# → Health check : http://localhost:4000/health
```

**Terminal 2 — Frontend (Plateforme interne) :**
```bash
cd frontend
npm run dev
# → App disponible sur http://localhost:3000
```

**Terminal 3 — Public Portal :**
```bash
cd public-portal
npm run dev
# → Site public disponible sur http://localhost:3001
```

---

### Étape 5 — Tester la connexion

Ouvrez les deux applications :

**Plateforme Interne** : http://localhost:3000 avec un compte interne

| Compte | Email | Mot de passe | Rôle |
|--------|-------|--------------|------|
| Super Admin | `admin@fds-gabon.org` | `Admin@FDS2024!` | SUPER_ADMIN |
| Resp. Pays Gabon | `resp.gabon@fds-gabon.org` | `Test@1234!` | RESPONSABLE_PAYS |
| Président France | `president@fds-france.org` | `Test@1234!` | PRESIDENT |

**Portail Public** : http://localhost:3001 (accessible à tous)
- Accueil avec contenu d'exemple
- Blog avec 5 articles
- Publications (notes politiques)
- Événements publics
- Pages d'information

| Compte | Email | Mot de passe | Rôle |
|--------|-------|--------------|------|
| Super Admin | `admin@fds-gabon.org` | `Admin@FDS2024!` | SUPER_ADMIN |
| Resp. Pays Gabon | `resp.gabon@fds-gabon.org` | `Test@1234!` | RESPONSABLE_PAYS |
| Membre Gabon | `membre@fds-gabon.org` | `Test@1234!` | MEMBRE |
| Président France | `president@fds-france.org` | `Test@1234!` | PRESIDENT |
| SG France | `sg@fds-france.org` | `Test@1234!` | SECRETAIRE_GENERAL |

---

## 🌍 Portail Public (Site Officiel)

Voir [public-portal/README.md](public-portal/README.md) pour la documentation complète.

### Pages Principales

| Page | URL | Fonction |
|------|-----|----------|
| Accueil | `/` | Présentation du FDS |
| Le Parti | `/le-parti` | Histoire, valeurs, leadership |
| Blog | `/blog` | Articles par catégories |
| Publications | `/publications` | Notes politiques et rapports |
| Diaspora | `/diaspora` | Initiatives diaspora |
| Événements | `/evenements` | Calendrier public |
| Rejoindre | `/rejoindre` | Adhésion et engagement |
| Contact | `/contact` | Formulaire de contact |

### Contenu Exemple Généré

- **5 articles** couvrant : Diaspora, Économie, Santé, IA, Institutions
- **2 publications** : Note stratégie diaspora, Rapport énergie africaine
- **3 événements** : Université d'été, Café citoyen, Journée diaspora
- **2 abonnés newsletter**

### Intégration Interne-Public

```
Plateforme Interne          Portail Public
├── Créer article      →    ├── En attente de validation
├── Valider article    →    ├── Publié automatiquement
├── Créer événement    →    ├── Visible au public
└── Contrôler contenu  →    └── Modération centralisée
```

---

## 🔧 Commandes utiles

### Backend

```bash
cd backend

npm run dev              # Démarrer en mode développement (nodemon)
npm run db:migrate       # Créer une nouvelle migration Prisma
npm run db:seed          # Réinsérer les données initiales
npm run db:studio        # Ouvrir Prisma Studio (interface graphique DB)
npm run db:reset         # Réinitialiser la base (⚠️ efface tout)
npm run db:generate      # Régénérer le client Prisma
npm test                 # Lancer les tests
npm run lint             # Vérifier le code
```

### Frontend (Plateforme Interne)

```bash
cd frontend

npm run dev              # Démarrer Vite en dev
npm run build            # Build de production
npm run preview          # Prévisualiser le build prod
npm test                 # Tests Vitest
npm run test:ui          # Interface visuelle des tests
npm run lint             # Vérifier le code TypeScript
```

### Public Portal

```bash
cd public-portal

npm install              # Installer (première fois)
npm run dev              # Démarrer en dev (port 3001)
npm run build            # Build pour production
npm start                # Lancer la version build
npm run lint             # Vérifier le code
npm run type-check       # Vérifier les types TypeScript
```

### Docker

```bash
# Démarrer tous les services
docker compose up -d

# Démarrer uniquement la base de données + Redis + MinIO
docker compose up -d postgres redis minio

# Voir les logs d'un service
docker compose logs -f postgres
docker compose logs -f api

# Arrêter tout
docker compose down

# Arrêter et supprimer les volumes (⚠️ efface la base)
docker compose down -v

# Rebuild des images
docker compose build --no-cache
```

### Prisma

```bash
cd backend

# Voir l'état des migrations
npx prisma migrate status

# Créer une migration après modification du schema
npx prisma migrate dev --name nom_de_la_migration

# Appliquer en production
npx prisma migrate deploy

# Interface graphique de la base de données
npx prisma studio
# → Ouvre http://localhost:5555
```

---

## 🗄️ Accès aux services

| Service | URL | Identifiants |
|---------|-----|--------------|
| Plateforme Interne | http://localhost:3000 | Voir ci-dessus |
| Portail Public | http://localhost:3001 | — |
| API Backend | http://localhost:4000 | — |
| API Health | http://localhost:4000/health | — |
| MinIO Console | http://localhost:9001 | fds_minio / minio_secret_2024 |
| PostgreSQL | localhost:5432 | fds_user / fds_secret_2024 |
| Redis | localhost:6379 | password: redis_secret |
| Prisma Studio | http://localhost:5555 | `npx prisma studio` (backend/) |

---

## 🧱 Architecture des endpoints API

```
POST   /api/v1/auth/register          Inscription
POST   /api/v1/auth/login             Connexion → accessToken + refreshToken
POST   /api/v1/auth/refresh           Renouveler le token
POST   /api/v1/auth/logout            Déconnexion
GET    /api/v1/auth/me                Profil courant

GET    /api/v1/users                  Liste membres (admin)
GET    /api/v1/users/:id              Détail membre
PATCH  /api/v1/users/:id             Modifier membre
DELETE /api/v1/users/:id             Supprimer membre

GET    /api/v1/countries             Liste des pays
POST   /api/v1/countries             Créer un pays (super admin)

GET    /api/v1/poles                 Liste des pôles
POST   /api/v1/poles                 Créer un pôle

GET    /api/v1/projects              Liste des projets
POST   /api/v1/projects              Créer un projet
GET    /api/v1/projects/:id          Détail projet
PATCH  /api/v1/projects/:id          Modifier projet

GET    /api/v1/tasks                 Tâches (filtrables)
POST   /api/v1/tasks                 Créer une tâche
PATCH  /api/v1/tasks/:id             Modifier / changer statut

GET    /api/v1/documents             Documents accessibles
POST   /api/v1/documents             Upload fichier (multipart)
DELETE /api/v1/documents/:id         Supprimer document

GET    /api/v1/messages/:poleId      Messages d'un pôle
POST   /api/v1/messages              Envoyer un message

GET    /api/v1/announcements         Annonces visibles
POST   /api/v1/announcements         Créer une annonce

GET    /api/v1/events                Événements à venir
POST   /api/v1/events                Créer un événement

GET    /api/v1/notifications         Notifications de l'utilisateur
PATCH  /api/v1/notifications/:id/read  Marquer comme lue
```

### 🌍 Endpoints Publiques (Portail)

```
GET    /api/v1/articles              Articles publiés
GET    /api/v1/articles?category=ECONOMIE  Par catégorie
GET    /api/v1/articles/:slug        Détail article
POST   /api/v1/articles/:id/comments Commenter un article

GET    /api/v1/publications          Publications publiées
GET    /api/v1/publications/:slug    Détail publication
GET    /api/v1/publications/:id/download  Télécharger PDF

GET    /api/v1/public-events         Événements publics
GET    /api/v1/public-events/:slug   Détail événement
POST   /api/v1/public-events/:id/register  S'inscrire

POST   /api/v1/newsletter/subscribe  S'abonner à la newsletter
POST   /api/v1/contact               Envoyer un message
POST   /api/v1/membership            Demande d'adhésion
```

---

## 🔒 Sécurité

- **JWT** : access token (15 min) + refresh token (7 jours, rotation à chaque usage)
- **Bcrypt** : hashage des mots de passe (12 rounds)
- **Helmet** : headers HTTP sécurisés
- **Rate limiting** : protection contre le brute-force
- **CORS** : origines contrôlées
- **RBAC** : 9 rôles hiérarchiques (SUPER_ADMIN → OBSERVATEUR)
- **Multi-tenant** : isolation par `country_id` sur chaque ressource

**Rôles disponibles :**
- SUPER_ADMIN : Accès total
- PRESIDENT : Président
- SECRETAIRE_GENERAL : Secrétaire Général
- SECRETAIRE_GENERAL_ADJOINT : Secrétaire Général Adjoint
- TRESORIER_NATIONAL : Trésorier National
- RESPONSABLE_PAYS : Chef de section nationale
- RESPONSABLE_POLE : Chef d'un pôle thématique
- MEMBRE : Membre ordinaire
- OBSERVATEUR : Lecture seule

---

## 📦 Déploiement production (Hetzner VPS)

```bash
# 1. Sur le serveur Hetzner (Ubuntu 22.04)
apt update && apt install -y docker.io docker-compose-v2 git

# 2. Cloner le projet
git clone <votre-repo> /opt/fds-platform
cd /opt/fds-platform

# 3. Configurer l'environnement
cp .env.example .env
nano .env   # Modifier TOUS les mots de passe et secrets

# 4. Lancer en production
docker compose up -d

# 5. Migrations
docker compose exec api npx prisma migrate deploy
docker compose exec api node prisma/seed.js

# 6. Configurer le domaine + SSL (Certbot)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d votre-domaine.com
```

---

## 🗺️ Phases de développement

| Phase | Contenu | Durée estimée |
|-------|---------|---------------|
| **Phase 1** ✅ | Auth, structure DB, RBAC, dashboard | 3-4 semaines |
| **Phase 2** | Membres, pôles, projets/tâches | 4-5 semaines |
| **Phase 3** | Documents (MinIO), messagerie WS | 3-4 semaines |
| **Phase 4** | Annonces, agenda, notifications | 2-3 semaines |
| **Phase 5** | Analytics, admin, déploiement prod | 2-3 semaines |

---

## 🇫🇷 Fonctionnalités France (2026)

Basé sur la méthodologie de travail FDS France :

### 🏛️ Structure organisationnelle
- **Rôles** : Président, Secrétaire Général, Secrétaire Général Adjoint, Trésorier National, Responsables de pôles
- **Pôles France** : Diaspora & Retour, Économie & Entrepreneuriat, Social & Solidarité, Communication, Citoyenneté & Droits, Institutions

### ⚙️ Nouvelles fonctionnalités
- **Réunions structurées** : Agenda, comptes rendus, participants, décisions, tâches post-réunion
- **Production intellectuelle** : Notes politiques, rapports avec versioning et validation
- **Gestion diaspora** : Profils membres diaspora, problématiques (emploi, bourses, retour)
- **Communication** : Planification contenus, calendrier éditorial, suivi visibilité
- **Partenariats** : Répertoire contacts, historique interactions, agenda rencontres
- **Suivi stratégique 2026** : Projets par phases (diagnostic, déploiement, consolidation)

### 📊 Dashboard global
- Vue d'ensemble activités par pôle
- Indicateurs et alertes
- Suivi priorités 2026

### 🚀 Projets majeurs intégrés
- Université d'été
- Journée nationale de la diaspora
- 1 Talent = 1 Mission
- Création de sections en France

---

## 🤝 Contribution

1. Créer une branche : `git checkout -b feature/nom-fonctionnalite`
2. Développer + tester
3. `git commit -m "feat: description"`
4. Pull request vers `main`

---

*FDS Platform — Développé pour le Front Démocratique et Social*
