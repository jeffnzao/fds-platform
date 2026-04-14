// routes/announcement.routes.js
const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { prisma } = require('../utils/prisma');

router.get('/', authenticate, async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const where = { OR: [{ target: 'TOUS' }, { target: 'PAYS', countryId: req.user.countryId }] };
    const items = await prisma.announcement.findMany({
      where, take: limit,
      include: { author: { select: { firstName: true, lastName: true } } },
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
    });
    res.json({ items });
  } catch (err) { next(err); }
});

router.post('/', authenticate, authorize('SUPER_ADMIN', 'SECRETAIRE_GENERAL', 'RESPONSABLE_PAYS'), async (req, res, next) => {
  try {
    const ann = await prisma.announcement.create({
      data: { ...req.body, authorId: req.user.id },
    });
    res.status(201).json(ann);
  } catch (err) { next(err); }
});

module.exports = router;
