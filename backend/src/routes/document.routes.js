// routes/document.routes.js
const router = require('express').Router();
const { authenticate } = require('../middleware/auth.middleware');
const { prisma } = require('../utils/prisma');

router.get('/', authenticate, async (req, res, next) => {
  try {
    const where = { OR: [{ visibility: 'PUBLIC' }, { countryId: req.user.countryId }] };
    const docs = await prisma.document.findMany({ where, include: { uploadedBy: { select: { firstName: true, lastName: true } } }, orderBy: { createdAt: 'desc' } });
    res.json({ items: docs });
  } catch (err) { next(err); }
});

module.exports = router;
