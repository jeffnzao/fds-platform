// controllers/auth.controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { prisma } = require('../utils/prisma');
const { logger } = require('../utils/logger');

const SALT_ROUNDS = 12;

/** Génère access + refresh tokens */
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
  const refreshToken = uuidv4(); // token opaque stocké en base
  return { accessToken, refreshToken };
};

// ─── INSCRIPTION ────────────────────────────────────────────
const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone, countryId } = req.body;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(409).json({ error: 'Email déjà utilisé' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        phone,
        countryId,
        role: 'MEMBRE',
        status: 'EN_ATTENTE', // validation manuelle requise
      },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
    });

    logger.info(`Nouvel utilisateur inscrit: ${email}`);
    res.status(201).json({ message: 'Inscription réussie. En attente de validation.', user });
  } catch (err) {
    next(err);
  }
};

// ─── CONNEXION ──────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Identifiants incorrects' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Identifiants incorrects' });

    if (user.status === 'EN_ATTENTE') {
      return res.status(403).json({ error: 'Compte en attente de validation' });
    }
    if (user.status === 'SUSPENDU') {
      return res.status(403).json({ error: 'Compte suspendu' });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    // Stocker le refresh token en base
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
      },
    });

    // Mettre à jour la date de dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      countryId: user.countryId,
    };

    res.json({ accessToken, refreshToken, user: userData });
  } catch (err) {
    next(err);
  }
};

// ─── RAFRAÎCHISSEMENT TOKEN ─────────────────────────────────
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token requis' });

    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Refresh token invalide ou expiré' });
    }

    // Rotation : supprimer l'ancien, créer un nouveau
    await prisma.refreshToken.delete({ where: { id: stored.id } });

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(stored.userId);

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: stored.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
};

// ─── DÉCONNEXION ────────────────────────────────────────────
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }
    res.json({ message: 'Déconnexion réussie' });
  } catch (err) {
    next(err);
  }
};

// ─── PROFIL COURANT ─────────────────────────────────────────
const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        phone: true, avatarUrl: true, role: true, status: true,
        memberNumber: true, countryId: true, country: { select: { name: true, code: true } },
        poles: { include: { pole: { select: { id: true, name: true } } } },
        createdAt: true,
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh, logout, me };
