// routes/pole.routes.js
const router = require('express').Router();
const { authenticate } = require('../middleware/auth.middleware');
const { prisma } = require('../utils/prisma');

router.get('/', authenticate, async (req, res, next) => {
  try {
    const where = req.user.countryId ? { countryId: req.user.countryId } : {};
    const poles = await prisma.pole.findMany({ where, include: { _count: { select: { members: true, projects: true } } } });
    res.json(poles);
  } catch (err) { next(err); }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const pole = await prisma.pole.create({ data: req.body });
    res.status(201).json(pole);
  } catch (err) { next(err); }
});

module.exports = router;
