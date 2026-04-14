# 🚀 GUIDE DE DÉMARRAGE RAPIDE

## ⚡ Démarrage en 5 minutes

### 1️⃣ Vérifier les prérequis

```bash
node --version     # Node.js 20+
npm --version      # npm 10+
docker --version   # Docker
```

### 2️⃣ Installation complète

```bash
# À la racine du projet
cd fds-platform

# Backend
cd backend
npm install
cd ..

# Portail Public
cd public-portal
npm install
cd ..

# Frontend (Interne)
cd frontend
npm install
cd ..
```

### 3️⃣ Configurer l'environnement

```bash
# À la racine
cp .env.example .env

# Portail Public
cd public-portal
cp .env.example .env.local
cd ..
```

### 4️⃣ Lancer les services

**⚠️ IMPORTANT : Choisir UN MODE DE DÉVELOPPEMENT**

#### Option A : Développement local (RECOMMANDÉ pour développement actif)

**Terminal 1 - Services de base uniquement**
```bash
# Lancer SEULEMENT postgres, redis, minio (pas les apps)
docker-compose up -d postgres redis minio
```

**Terminal 2 - Exécuter les migrations (UNE SEULE FOIS)**
```bash
cd backend
npm run db:migrate
npm run db:seed
node prisma/seed-public.js
cd ..
```

**Terminal 3 - Backend API**
```bash
cd backend
npm run dev
# http://localhost:4000
```

**Terminal 4 - Portail Public**
```bash
cd public-portal
npm run dev
# http://localhost:3001
```

**Terminal 5 - Frontend Interne (optionnel)**
```bash
cd frontend
npm run dev
# http://localhost:3000
```

#### Option B : Développement en Docker (pour tester containérisation)

```bash
docker-compose up -d
# Lance tout en conteneurs
# API: http://localhost:4000
# Frontend: http://localhost:3000
# Portail Public: http://localhost:3001
```

### 5️⃣ Accédez aux applications

| Application | URL | Port | Status |
|-------------|-----|------|--------|
| API Backend | http://localhost:4000 | 4000 | ✅ Prêt |
| Frontend Interne | http://localhost:3000 | 3000 | ✅ Prêt (opt) |
| Portail Public | http://localhost:3001 | 3001 | ✅ Prêt |
| MinIO Console | http://localhost:9001 | 9001 | ✅ Prêt |
| Prisma Studio | http://localhost:5555 | 5555 | ✅ Sur demande |

---

## 📖 Documentation

### Vue d'ensemble
- [README.md](./README.md) - Guide complet du projet
- [ARCHITECTURE_GLOBALE.md](./ARCHITECTURE_GLOBALE.md) - Architecture interne/publique

### Applications
- [public-portal/README.md](./public-portal/README.md) - Détails portail public
- [frontend/README.md](./frontend) - Plateforme interne (si disponible)

### Synthèses
- [PORTAIL_PUBLIC_SYNTHESE.md](./PORTAIL_PUBLIC_SYNTHESE.md) - Ce qui a été créé

---

## 🎨 Portail Public - Pages

### Accueil (http://localhost:3001)
- Hero avec message du FDS
- Message du Président
- Mission et valeurs
- Articles en vedette
- CTA "Rejoindre"

### Navigation disponible
```
/ (Accueil)
├── /le-parti         (Présentation)
├── /blog             (Actualités)
├── /publications     (Notes politiques)
├── /diaspora         (Initiatives diaspora)
├── /evenements       (Calendrier)
├── /rejoindre        (Adhésion)
└── /contact          (Formulaire)
```

---

## 🗄️ Base de données

### Contenu exemple inclus
- **5 articles** : Diaspora, Économie, Santé, IA, Institutions
- **2 publications** : Stratégie diaspora, Rapport énergie
- **3 événements** : Université d'été, Café citoyen, Journée diaspora
- **2 utilisateurs France** : Président + SG
- **3 utilisateurs Gabon** : Admin + Responsable + Membre

### Accéder à la base

```bash
# Dans le backend
npx prisma studio
# Accès: http://localhost:5555
```

---

## 🔧 Troubleshooting

### ⚠️ EADDRINUSE: Port déjà utilisé

**Cause** : Vous exécutez les apps en double (Docker + local + npm run dev)

```bash
# Solution 1️⃣ : Arrêter Docker et relancer uniquement les services
docker-compose down
docker-compose up -d postgres redis minio  # Services SEULEMENT
cd backend && npm run dev

# Solution 2️⃣ : Vérifier quel processus utilise le port
netstat -ano | findstr :4000  # Windows (montre le PID)
lsof -i :4000                 # Mac/Linux

# Solution 3️⃣ : Tueur le processus
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # Mac/Linux
```

### Port déjà utilisé

```bash
# Trouver le processus
lsof -i :3001  # Pour port 3001

# Tuer le processus
kill -9 <PID>
```

### Erreur de connexion API

```bash
# Vérifier que le backend est lancé
curl http://localhost:4000/health

# Vérifier que NEXT_PUBLIC_API_URL est correct
cat public-portal/.env.local
```

### Base de données non trouvée / Erreur 'table does not exist'

```bash
# Les migrations N'ÉTAIENT PAS exécutées ! Lancer ceci UNE SEULE FOIS:
cd backend

# 1️⃣ Créer les tables
npm run db:migrate

# 2️⃣ Charger les données de test
npm run db:seed
node prisma/seed-public.js

# Puis redémarrer l'API
npm run dev
```

### Images non chargées

- Images utilisent des placehold (base64/URLs relatives)
- Pour production, utiliser CDN ou bucket S3

---

## 📱 Responsive Design

Le portail public est complètement responsive :
- 📱 Mobile (375px+)
- 💻 Tablet (768px+)
- 🖥️ Desktop (1024px+)

Testez avec Chrome DevTools (F12 → Toggle device toolbar)

---

## 🔑 Comptes de test

### Plateforme Interne (/login sur http://localhost:3000)

```
Email: admin@fds-gabon.org
Mdp:   Admin@FDS2024!
Rôle:  SUPER_ADMIN
```

```
Email: president@fds-france.org
Mdp:   Test@1234!
Rôle:  PRESIDENT
```

### Portail Public
- Aucun login requis
- Tous les contenus sont publiques
- Les formulaires (contact, adhésion) ne requièrent pas de compte

---

## 🚢 Déploiement

### Production (Vercel pour Next.js)

```bash
cd public-portal

# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel

# Variables d'env
vercel env add NEXT_PUBLIC_API_URL
# https://api.example.com/api/v1
```

### Production (Docker)

```bash
# Construire les images
docker-compose -f docker-compose.prod.yml build

# Lancer
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📚 Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Express.js Docs](https://expressjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 💬 Support

Pour des questions sur :
- **Architecture** → Voir ARCHITECTURE_GLOBALE.md
- **Portail Public** → Voir public-portal/README.md
- **Base de données** → Voir backend/prisma/schema.prisma
- **API** → Voir backend/src/routes/

---

## ✅ Checklist de vérification

- [ ] Node.js 20+ installé
- [ ] Docker en cours d'exécution
- [ ] Backend lancé (http://localhost:4000)
- [ ] Portail public lancé (http://localhost:3001)
- [ ] Base de données accessible
- [ ] Articles générés visibles
- [ ] Formulaires fonctionnels

---

*Prêt? Commencez à explorer et contribuer! 🚀*
