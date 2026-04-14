// routes/message.routes.js
const router = require('express').Router();
const { authenticate } = require('../middleware/auth.middleware');
const { prisma } = require('../utils/prisma');
const { broadcastToPole } = require('../services/socket.service');

router.get('/:poleId', authenticate, async (req, res, next) => {
  try {
    const messages = await prisma.message.findMany({
      where: { poleId: req.params.poleId, parentId: null },
      include: { author: { select: { firstName: true, lastName: true, avatarUrl: true } }, replies: { include: { author: { select: { firstName: true, lastName: true } } } } },
      orderBy: { createdAt: 'asc' },
    });
    res.json({ items: messages });
  } catch (err) { next(err); }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const message = await prisma.message.create({
      data: { ...req.body, authorId: req.user.id },
      include: { author: { select: { firstName: true, lastName: true, avatarUrl: true } } },
    });
    broadcastToPole(req.io, message.poleId, 'message:new', message);
    res.status(201).json(message);
  } catch (err) { next(err); }
});

module.exports = router;
