// services/socket.service.js — WebSocket temps réel
const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

const setupSocketIO = (io) => {
  // Authentification WebSocket
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Token manquant'));
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.sub;
      next();
    } catch {
      next(new Error('Token invalide'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`WebSocket connecté: user ${socket.userId}`);

    // Rejoindre une room de pôle
    socket.on('join:pole', (poleId) => {
      socket.join(`pole:${poleId}`);
      logger.info(`User ${socket.userId} rejoint pole:${poleId}`);
    });

    // Quitter une room
    socket.on('leave:pole', (poleId) => {
      socket.leave(`pole:${poleId}`);
    });

    // Rejoindre sa room personnelle (notifications)
    socket.join(`user:${socket.userId}`);

    socket.on('disconnect', () => {
      logger.info(`WebSocket déconnecté: user ${socket.userId}`);
    });
  });
};

/** Envoyer une notification à un utilisateur spécifique */
const notifyUser = (io, userId, event, data) => {
  io.to(`user:${userId}`).emit(event, data);
};

/** Diffuser un message dans un pôle */
const broadcastToPole = (io, poleId, event, data) => {
  io.to(`pole:${poleId}`).emit(event, data);
};

module.exports = { setupSocketIO, notifyUser, broadcastToPole };
