// middleware/auth.middleware.js — Vérification JWT

const jwt = require('jsonwebtoken');
const { prisma } = require('../utils/prisma');

/**
 * Vérifie le token JWT dans le header Authorization.
 * Attache req.user si valide.
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        countryId: true,
      },
    });

    if (!user) return res.status(401).json({ error: 'Utilisateur introuvable' });
    if (user.status === 'SUSPENDU') return res.status(403).json({ error: 'Compte suspendu' });

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré' });
    }
    return res.status(401).json({ error: 'Token invalide' });
  }
};

/**
 * Vérifie que l'utilisateur a l'un des rôles autorisés.
 * Usage: authorize('SUPER_ADMIN', 'RESPONSABLE_PAYS')
 */
const authorize = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Non authentifié' });
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Permission insuffisante' });
  }
  next();
};

module.exports = { authenticate, authorize };
