// routes/event.routes.js
const router = require('express').Router();
const { authenticate } = require('../middleware/auth.middleware');
const { prisma } = require('../utils/prisma');

router.get('/', authenticate, async (req, res, next) => {
  try {
    const where = { startDate: { gte: new Date() } };
    if (req.user.countryId) where.OR = [{ countryId: null }, { countryId: req.user.countryId }];
    const events = await prisma.event.findMany({ where, orderBy: { startDate: 'asc' }, take: 20 });
    res.json({ items: events });
  } catch (err) { next(err); }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const event = await prisma.event.create({ data: { ...req.body, creatorId: req.user.id } });
    res.status(201).json(event);
  } catch (err) { next(err); }
});

module.exports = router;
