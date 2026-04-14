// routes/country.routes.js
const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { prisma } = require('../utils/prisma');

router.get('/', authenticate, async (_req, res, next) => {
  try {
    const countries = await prisma.country.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } });
    res.json(countries);
  } catch (err) { next(err); }
});

router.post('/', authenticate, authorize('SUPER_ADMIN'), async (req, res, next) => {
  try {
    const country = await prisma.country.create({ data: req.body });
    res.status(201).json(country);
  } catch (err) { next(err); }
});

module.exports = router;
