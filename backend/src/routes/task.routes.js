// routes/task.routes.js
const router = require('express').Router();
const { authenticate } = require('../middleware/auth.middleware');
const { prisma } = require('../utils/prisma');

router.get('/', authenticate, async (req, res, next) => {
  try {
    const where = {};
    if (req.query.projectId) where.projectId = req.query.projectId;
    if (req.query.assigneeId) where.assigneeId = req.query.assigneeId;
    if (req.query.status) where.status = req.query.status;
    const tasks = await prisma.task.findMany({ where, include: { assignee: { select: { firstName: true, lastName: true } } }, orderBy: { createdAt: 'desc' } });
    res.json({ items: tasks });
  } catch (err) { next(err); }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const task = await prisma.task.create({ data: { ...req.body, creatorId: req.user.id } });
    res.status(201).json(task);
  } catch (err) { next(err); }
});

router.patch('/:id', authenticate, async (req, res, next) => {
  try {
    const task = await prisma.task.update({ where: { id: req.params.id }, data: req.body });
    res.json(task);
  } catch (err) { next(err); }
});

module.exports = router;
