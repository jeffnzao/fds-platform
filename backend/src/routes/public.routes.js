// backend/src/routes/public.routes.js — Routes publiques pour le portail

const express = require('express');
const router = express.Router();

// Note: Ces routes seront implémentées dans les prochaines étapes
// Voici la structure d'API attendue

/**
 * ARTICLES / BLOG
 * GET  /api/v1/articles                    - Lister tous les articles publiés
 * GET  /api/v1/articles?category=ECONOMIE  - Articles par catégorie
 * GET  /api/v1/articles?featured=true      - Articles en vedette
 * GET  /api/v1/articles/:slug              - Détail d'un article
 * POST /api/v1/articles/:id/comments       - Ajouter un commentaire
 */

/**
 * PUBLICATIONS (Notes, Rapports, Tribunes)
 * GET  /api/v1/publications                - Toutes les publications publiées
 * GET  /api/v1/publications?type=NOTE_POLITIQUE - Par type
 * GET  /api/v1/publications/:slug          - Détail d'une publication
 * GET  /api/v1/publications/:id/download   - Télécharger PDF
 */

/**
 * ÉVÉNEMENTS PUBLICS
 * GET  /api/v1/public-events               - Événements publics à venir
 * GET  /api/v1/public-events/:slug         - Détail d'un événement
 * POST /api/v1/public-events/:id/register  - S'inscrire à un événement
 * GET  /api/v1/public-events/:id/registrations - Liste des inscrits (admin)
 */

/**
 * NEWSLETTER
 * POST /api/v1/newsletter/subscribe        - S'abonner
 * GET  /api/v1/newsletter/verify/:token   - Vérifier email (confirmation)
 * POST /api/v1/newsletter/unsubscribe     - Se désabonner
 */

/**
 * CONTACT
 * POST /api/v1/contact                     - Envoyer un message
 * GET  /api/v1/contact/:id                 - Détail (admin)
 * GET  /api/v1/contact                     - Liste (admin)
 * PATCH /api/v1/contact/:id/read          - Marquer comme lu (admin)
 */

/**
 * MEMBERSHIP / ADHÉSION
 * POST /api/v1/membership                  - Demande d'adhésion
 * GET  /api/v1/membership                  - Lister (admin)
 * PATCH /api/v1/membership/:id/approve    - Approuver
 * PATCH /api/v1/membership/:id/reject     - Rejeter
 */

/**
 * PAGES PUBLIQUES
 * GET  /api/v1/pages/about                 - À propos
 * GET  /api/v1/pages/values                - Valeurs
 * GET  /api/v1/pages/leadership            - Leadership
 * GET  /api/v1/pages/diaspora              - Diaspora
 */

module.exports = router;
