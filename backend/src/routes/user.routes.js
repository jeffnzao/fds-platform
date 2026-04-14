// routes/user.routes.js
const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { prisma } = require('../utils/prisma');

// Liste des membres
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { countryId, role, status, limit = 20, page = 1 } = req.query;
    const where = {};
    if (countryId) where.countryId = countryId;
    if (role) where.role = role;
    if (status) where.status = status;
    // Resp. pays : uniquement son pays
    if (req.user.role === 'RESPONSABLE_PAYS') where.countryId = req.user.countryId;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where, skip: (page - 1) * limit, take: Number(limit),
        select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true, memberNumber: true, country: { select: { name: true, code: true } }, createdAt: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);
    res.json({ items: users, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
});

// Valider un membre (admin)
router.patch('/:id/status', authenticate, authorize('SUPER_ADMIN', 'SECRETAIRE_GENERAL', 'RESPONSABLE_PAYS'), async (req, res, next) => {
  try {
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { status: req.body.status } });
    res.json({ id: user.id, status: user.status });
  } catch (err) { next(err); }
});

module.exports = router;
