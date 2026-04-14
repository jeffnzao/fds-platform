#!/bin/bash
# scripts/setup.sh — Installation et lancement FDS Platform
# Usage: bash scripts/setup.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()    { echo -e "${GREEN}[FDS]${NC} $1"; }
warn()   { echo -e "${YELLOW}[WARN]${NC} $1"; }
error()  { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║     FDS Platform — Setup & Launch        ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ── Vérifications prérequis ──────────────────────────────────
log "Vérification des prérequis..."

command -v docker  >/dev/null 2>&1 || error "Docker non installé. https://docs.docker.com/get-docker/"
command -v node    >/dev/null 2>&1 || error "Node.js non installé. https://nodejs.org/"
command -v npm     >/dev/null 2>&1 || error "npm non installé."

DOCKER_VERSION=$(docker --version | grep -oP '\d+\.\d+')
NODE_VERSION=$(node --version | grep -oP '\d+' | head -1)

log "Docker $DOCKER_VERSION ✓"
log "Node.js v$(node --version | tr -d 'v') ✓"

if [ "$NODE_VERSION" -lt 20 ]; then
  warn "Node.js 20+ recommandé (vous avez v$(node --version))"
fi

# ── Fichier .env ─────────────────────────────────────────────
if [ ! -f ".env" ]; then
  log "Création du fichier .env depuis .env.example..."
  cp .env.example .env
  warn "IMPORTANT: Éditez .env et changez les mots de passe avant la production !"
else
  log "Fichier .env existant ✓"
fi

# ── Installation dépendances backend ─────────────────────────
log "Installation des dépendances backend..."
cd backend && npm install --silent && cd ..
log "Dépendances backend installées ✓"

# ── Installation dépendances frontend ────────────────────────
log "Installation des dépendances frontend..."
cd frontend && npm install --silent && cd ..
log "Dépendances frontend installées ✓"

# ── Démarrage Docker (Postgres, Redis, MinIO) ─────────────────
log "Démarrage des services Docker (Postgres, Redis, MinIO)..."
docker compose up -d postgres redis minio

# Attendre que Postgres soit prêt
log "Attente que PostgreSQL soit prêt..."
until docker compose exec postgres pg_isready -U fds_user -d fds_db >/dev/null 2>&1; do
  echo -n "."
  sleep 1
done
echo ""
log "PostgreSQL prêt ✓"

# ── Migrations Prisma ─────────────────────────────────────────
log "Exécution des migrations Prisma..."
cd backend
DATABASE_URL="postgresql://fds_user:$(grep POSTGRES_PASSWORD ../.env | cut -d= -f2)@localhost:5432/fds_db" \
  npx prisma migrate dev --name init --skip-seed 2>/dev/null || \
  npx prisma db push
log "Migrations appliquées ✓"

# ── Seed ─────────────────────────────────────────────────────
log "Insertion des données initiales (seed)..."
DATABASE_URL="postgresql://fds_user:$(grep POSTGRES_PASSWORD ../.env | cut -d= -f2)@localhost:5432/fds_db" \
  node prisma/seed.js
cd ..

# ── Résumé ───────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║          ✅  Setup terminé !             ║"
echo "╠══════════════════════════════════════════╣"
echo "║                                          ║"
echo "║  Pour lancer en développement :          ║"
echo "║    Terminal 1 → cd backend && npm run dev║"
echo "║    Terminal 2 → cd frontend && npm run dev║"
echo "║                                          ║"
echo "║  URLs :                                  ║"
echo "║    Frontend  → http://localhost:3000     ║"
echo "║    API       → http://localhost:4000     ║"
echo "║    MinIO UI  → http://localhost:9001     ║"
echo "║    Prisma    → npx prisma studio (back/) ║"
echo "║                                          ║"
echo "║  Comptes de test :                       ║"
echo "║    admin@fds-gabon.org / Admin@FDS2024!  ║"
echo "║    resp.gabon@fds-gabon.org / Test@1234! ║"
echo "║    membre@fds-gabon.org / Test@1234!     ║"
echo "║                                          ║"
echo "╚══════════════════════════════════════════╝"
echo ""
