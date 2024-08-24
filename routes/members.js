const express = require('express');
const router = express.Router();
const { Member, Book, Borrow } = require('../models');

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', async (req, res) => {
  const members = await Member.findAll({
    include: [{
      model: Borrow,
      attributes: ['bookId'],
      include: [Book]
    }]
  });

  res.json(members);
});

/**
 * @swagger
 * /api/members/{id}/borrow:
 *   post:
 *     summary: Borrow a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the member
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Book to be borrowed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Borrowing success
 */
router.post('/:id/borrow', async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  const book = await Book.findByPk(req.body.bookId);

  if (!member || !book) {
    return res.status(404).json({ message: 'Member or book not found' });
  }

  const activeBorrows = await Borrow.count({ where: { memberId: member.id, returnedAt: null } });

  if (activeBorrows >= 2 || member.penalized) {
    return res.status(403).json({ message: 'Cannot borrow more books' });
  }

  if (book.stock <= 0) {
    return res.status(403).json({ message: 'Book not available' });
  }

  await Borrow.create({ memberId: member.id, bookId: book.id });
  book.stock -= 1;
  await book.save();

  res.json({ message: 'Book borrowed successfully' });
});

/**
 * @swagger
 * /api/members/{id}/return:
 *   post:
 *     summary: Return a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the member
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Book to be returned
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Return success
 */
router.post('/:id/return', async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  const borrow = await Borrow.findOne({
    where: {
      memberId: member.id,
      bookId: req.body.bookId,
      returnedAt: null
    }
  });

  if (!borrow) {
    return res.status(404).json({ message: 'Borrow record not found' });
  }

  borrow.update({ returnedAt : new Date() })

  const book = await Book.findByPk(req.body.bookId);
  book.stock += 1;
  await book.save();

  const borrowedDuration = Math.ceil((new Date() - new Date(borrow.borrowedAt)) / (1000 * 60 * 60 * 24));
  if (borrowedDuration > 7) {
    member.penalized = true;
    await member.save();
  }

  res.json({ message: 'Book returned successfully' });
});

module.exports = router;
