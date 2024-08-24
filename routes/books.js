const express = require('express');
const router = express.Router();
const { Book, Borrow } = require('../models');

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', async (req, res) => {
  const books = await Book.findAll({
    include: [{
      model: Borrow,
      attributes: ['bookId'],
      where: { returnedAt: null },
      required: false
    }]
  });

  const availableBooks = books.map(book => ({
    ...book.toJSON(),
    availableStock: book.stock - book.Borrows.length
  }));

  res.json(availableBooks);
});

module.exports = router;
