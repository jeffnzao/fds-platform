// routes/project.routes.js
const router = require('express').Router();
const { authenticate } = require('../middleware/auth.middleware');
const { prisma } = require('../utils/prisma');

router.get('/', authenticate, async (req, res, next) => {
  try {
    const where = req.user.countryId ? { countryId: req.user.countryId } : {};
    const projects = await prisma.project.findMany({
      where, include: { owner: { select: { firstName: true, lastName: true } }, pole: { select: { name: true } }, _count: { select: { tasks: true, members: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ items: projects, total: projects.length });
  } catch (err) { next(err); }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const project = await prisma.project.create({
      data: { ...req.body, ownerId: req.user.id, countryId: req.body.countryId || req.user.countryId }
    });
    res.status(201).json(project);
  } catch (err) { next(err); }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const project = await prisma.project.findUniqueOrThrow({
      where: { id: req.params.id },
      include: { tasks: true, members: { include: { user: { select: { firstName: true, lastName: true } } } }, documents: true }
    });
    res.json(project);
  } catch (err) { next(err); }
});

router.patch('/:id', authenticate, async (req, res, next) => {
  try {
    const project = await prisma.project.update({ where: { id: req.params.id }, data: req.body });
    res.json(project);
  } catch (err) { next(err); }
});

module.exports = router;
