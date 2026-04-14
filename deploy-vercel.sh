# 🚀 Script de déploiement Vercel pour FDS Platform
# À exécuter après avoir poussé sur GitHub

echo "📦 Installation Vercel CLI..."
npm install -g vercel

echo "🔗 Connexion à Vercel..."
vercel login

echo "📁 Déploiement du portail public..."
cd public-portal
vercel --prod

echo "✅ Déploiement terminé !"
echo "🔗 Ton site sera disponible sur l'URL fournie par Vercel"