// middleware/error.middleware.js
const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, _next) => {
  logger.error(`${err.message}\n${err.stack}`);

  // Erreurs Prisma connues
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Ressource déjà existante (contrainte unique)' });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Ressource introuvable' });
  }

  const status = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Erreur interne du serveur'
    : err.message;

  res.status(status).json({ error: message });
};

module.exports = { errorHandler };
