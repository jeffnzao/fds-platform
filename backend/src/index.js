// src/index.js — Point d'entrée principal de l'API FDS

require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { Server } = require('socket.io');

const { prisma } = require('./utils/prisma');
const { logger } = require('./utils/logger');
const { setupSocketIO } = require('./services/socket.service');

// ─── Routes ─────────────────────────────────────────────────
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const countryRoutes = require('./routes/country.routes');
const poleRoutes = require('./routes/pole.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const documentRoutes = require('./routes/document.routes');
const messageRoutes = require('./routes/message.routes');
const announcementRoutes = require('./routes/announcement.routes');
const eventRoutes = require('./routes/event.routes');
const notificationRoutes = require('./routes/notification.routes');

// ─── Middleware d'erreur ─────────────────────────────────────
const { errorHandler } = require('./middleware/error.middleware');

const app = express();
const server = http.createServer(app);

// ─── Socket.IO ──────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: process.env.APP_URL || 'http://localhost:3000',
    credentials: true,
  },
});
setupSocketIO(io);

// ─── Middleware globaux ──────────────────────────────────────
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.APP_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));

// Attacher io à chaque requête pour usage dans les contrôleurs
app.use((req, _res, next) => {
  req.io = io;
  next();
});

// ─── Routes API ─────────────────────────────────────────────
const API_PREFIX = '/api/v1';
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/countries`, countryRoutes);
app.use(`${API_PREFIX}/poles`, poleRoutes);
app.use(`${API_PREFIX}/projects`, projectRoutes);
app.use(`${API_PREFIX}/tasks`, taskRoutes);
app.use(`${API_PREFIX}/documents`, documentRoutes);
app.use(`${API_PREFIX}/messages`, messageRoutes);
app.use(`${API_PREFIX}/announcements`, announcementRoutes);
app.use(`${API_PREFIX}/events`, eventRoutes);
app.use(`${API_PREFIX}/notifications`, notificationRoutes);

// ─── Health check ────────────────────────────────────────────
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

// ─── Catch 404 ───────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// ─── Gestionnaire d'erreurs global ───────────────────────────
app.use(errorHandler);

// ─── Démarrage ───────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  logger.info(`🚀 FDS API démarrée sur le port ${PORT}`);
  logger.info(`   Environnement: ${process.env.NODE_ENV}`);
  logger.info(`   Health check:  http://localhost:${PORT}/health`);
});

// ─── Gestion propre de l'arrêt ───────────────────────────────
process.on('SIGTERM', async () => {
  logger.info('SIGTERM reçu — fermeture propre...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});
