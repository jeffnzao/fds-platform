# 🏗️ ARCHITECTURE GLOBALE - FDS PLATFORM

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATEFORME FDS COMPLETE                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                 🌍 PORTAIL PUBLIC                       │  │
│  │            (Next.js) - http://localhost:3001           │  │
│  │                                                        │  │
│  │  ├─ Accueil (hero, présentation, CTA)                │  │
│  │  ├─ Le Parti (valeurs, leadership, pôles)            │  │
│  │  ├─ Blog (5 articles, filtrage catégories)           │  │
│  │  ├─ Publications (notes, rapports)                   │  │
│  │  ├─ Diaspora (enjeux, propositions)                  │  │
│  │  ├─ Événements (calendrier public)                   │  │
│  │  ├─ Rejoindre (adhésion, volontaires)                │  │
│  │  └─ Contact (formulaires)                            │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│                   API REST Commune                            │
│              (GET /articles, /events, etc.)                  │
│                          ↓                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │               🔒 PLATEFORME INTERNE                   │  │
│  │           (React + Vite) - http://localhost:3000      │  │
│  │                                                        │  │
│  │  ├─ Dashboard (Vue d'ensemble)                        │  │
│  │  ├─ Gestion Réunions (agenda, décisions)             │  │
│  │  ├─ Production Intellectuelle (articles, rapports)   │  │
│  │  ├─ Tâches & Projets (suivi, assignations)          │  │
│  │  ├─ Messagerie par Pôle (chat, threads)             │  │
│  │  ├─ Documents (stockage MinIO)                        │  │
│  │  ├─ Gestion Diaspora (profils, problématiques)       │  │
│  │  ├─ Communication (contenus, calendrier)             │  │
│  │  ├─ Partenariats (contacts, interactions)            │  │
│  │  └─ Admin (utilisateurs, rôles, modération)          │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              BACKEND API (Express.js)                  │  │
│  │         http://localhost:4000/api/v1                  │  │
│  │                                                        │  │
│  │  ├─ Auth (login, tokens, refresh)                    │  │
│  │  ├─ Users & Roles (RBAC)                            │  │
│  │  ├─ Articles (CRUD + modération)                     │  │
│  │  ├─ Publications (versioning + validation)           │  │
│  │  ├─ Events (public + private)                        │  │
│  │  ├─ Réunions (agenda, participants, décisions)      │  │
│  │  ├─ Tasks & Projects (gestion)                       │  │
│  │  ├─ Messages & Notifications                         │  │
│  │  ├─ Documents (MinIO integration)                    │  │
│  │  ├─ Newsletter & Contact (formulaires)               │  │
│  │  └─ Diaspora & Partenariats                          │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │            DONNÉES PARTAGÉES                          │  │
│  │          (PostgreSQL Base de données)                 │  │
│  │                                                        │  │
│  │  ├─ Users (internal + public registrations)           │  │
│  │  ├─ Articles (validated & published)                  │  │
│  │  ├─ Publications (internal creation → public)         │  │
│  │  ├─ Events (internal scheduling → public calendar)   │  │
│  │  ├─ Réunions (minutes, participants)                 │  │
│  │  ├─ Tasks (tracking, status)                         │  │
│  │  ├─ Diaspora (profiles, issues)                      │  │
│  │  ├─ Newsletter (subscribers)                         │  │
│  │  └─ Contact (messages, requests)                     │  │
│  │                                                        │  │
│  │  + Redis (cache, sessions)                            │  │
│  │  + MinIO (file storage)                               │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Workflow Contenu (Creatiom → Publication)

### Exemple : Article Politique

```
1. CRÉATION (Plateforme Interne)
   ├─ Utilisateur crée un article
   │  ├─ Texte (Markdown)
   │  ├─ Image
   │  └─ Catégorie (ECONOMIE, DIASPORA, etc.)
   └─ Status : BROUILLON

2. RÉVISION (Plateforme Interne)
   ├─ Éditeur/Admin lit l'article
   ├─ Revue pour qualité, ton, exactitude
   └─ Status : EN_ATTENTE (→ API) ou EN_REVUE

3. VALIDATION (Plateforme Interne)
   ├─ Décision : APPROUVER ou REJETER
   ├─ Si approuvé:
   │  └─ Status : APPROUVE
   ├─ Ajouter nom de l'approbateur
   └─ Ajouter date de publication

4. PUBLICATION AUTOMATIQUE (Backend API)
   ├─ Trigger lors de status = APPROUVE
   ├─ Créer entrée "published" si n'existe pas
   ├─ Rendre visible sur portail public
   └─ Status : PUBLIE

5. AFFICHAGE PUBLIC (Portail)
   ├─ Article visible sur /blog
   ├─ Filtrables par catégorie
   ├─ Compteur de vues
   └─ Système de commentaires modérés

6. ARCHIVAGE (Optionnel)
   ├─ Admin peut archiver ancien contenu
   ├─ Reste en base mais non visible
   └─ Status : ARCHIVE
```

## 📊 Modèle de données - Exemple

```javascript
// Article dans PostgreSQL
{
  id: "cluxxxxx",
  title: "La diaspora : un atout stratégique",
  slug: "diaspora-atout-strategique",
  excerpt: "Comment mobiliser nos talents...",
  content: "# La diaspora\n\nLa communauté...",
  category: "DIASPORA",
  
  authorId: "user_123",          // Qui l'a écrit
  author: { name: "Marie", ... },
  
  imageUrl: "/images/diaspora.jpg",
  
  status: "PUBLIE",              // BROUILLON → EN_ATTENTE → APPROUVE → PUBLIE
  featured: true,                // En vedette ?
  
  approvedById: "user_admin",    // Qui a approuvé
  approvedBy: { name: "Admin", ... },
  
  publishedAt: "2026-04-14",     // Quand publié
  viewCount: 256,                // Nb de lectures
  
  comments: [
    { author: "Jean", email: "jean@example.com", status: "EN_ATTENTE", ... }
  ],
  
  createdAt: "2026-04-10",
  updatedAt: "2026-04-14"
}
```

## 🔐 Contrôle d'Accès

### Plateforme Interne (Authentification requise)

```
SUPER_ADMIN         → Tous les articles, approbations, publication
RESPONSABLE_PAYS    → Articles pour son pays
RESPONSABLE_POLE    → Articles et publications de son pôle
MEMBRE              → Créer articles (en attente de validation)
OBSERVATEUR         → Lire seulement
```

### Portail Public (Aucune authentification)

```
Anonyme             → Voir articles publiés, événements, contacts
                     → Soumettre contact, adhésion, newsletter
                     → Voir infos Le Parti, Diaspora
```

## 🔄 Flux de Données API

### Créer un article (Interne)

```
POST /api/v1/articles
├─ Headers: { Authorization: "Bearer token" }
├─ Body:
│  ├─ title: "Mon article"
│  ├─ content: "# Contenu"
│  ├─ category: "DIASPORA"
│  ├─ imageUrl: "s3://..."
│  └─ status: "BROUILLON"
└─ Response: { id, slug, ... }
```

### Récupérer articles publiés (Public)

```
GET /api/v1/articles?status=PUBLIE
├─ NO Authentication needed
├─ Query params:
│  ├─ category: "ECONOMIE"
│  ├─ featured: true
│  └─ limit: 10
└─ Response: [ { id, title, excerpt, ... } ]
```

### Soumettre contact (Public)

```
POST /api/v1/contact
├─ NO Authentication
├─ Body:
│  ├─ firstName: "Jean"
│  ├─ lastName: "Dupont"
│  ├─ email: "jean@example.com"
│  ├─ subject: "Suggestion"
│  └─ message: "Je voudrais..."
└─ Response: { success: true }
```

## 🚀 Tech Stack

| Couche | Technology |
|--------|-----------|
| **Frontend Interne** | React 18 + TypeScript + Vite |
| **Frontend Public** | Next.js 14 + TypeScript + Tailwind |
| **Backend** | Node.js + Express.js |
| **Database** | PostgreSQL 15 |
| **Cache** | Redis |
| **File Storage** | MinIO (S3-compatible) |
| **ORM** | Prisma |
| **Auth** | JWT (access + refresh tokens) |
| **Containerization** | Docker + Docker Compose |

## 📈 Scalabilité

### Optimisations implémentées/à implémenter

- ✅ Multi-tenant par `country_id`
- ✅ JWT avec refresh tokens
- ⏳ Redis caching pour articles populaires
- ⏳ Pagination (limit/offset)
- ⏳ Full-text search Postgres
- ⏳ CDN pour images
- ⏳ Queue d'emails (Bull)
- ⏳ Rate limiting par IP/userId

## 🔐 Sécurité

- ✅ Hashnote les mdp (bcrypt 12 rounds)
- ✅ JWT signing with secrets
- ✅ CORS contrôlé
- ✅ Validation/Sanitization inputs
- ⏳ Rate limiting
- ⏳ CSRF tokens
- ⏳ CSP headers
- ⏳ SQL injection prevention (Prisma)

## 📊 Monitoring

À implémenter :
- [ ] Logs centralisés (ELK Stack)
- [ ] Monitoring erreurs (Sentry)
- [ ] APM (New Relic / DataDog)
- [ ] Alertes (Slack, Email)

---

*FDS Platform - Système d'information politique pour le Front Démocratique et Social*
