const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createBook,
    getBooks,
    getBookById,
    searchBooks,
} = require('../controllers/bookController');

// GET /api/books
router.get('/', getBooks);

// POST /api/books
router.post('/', protect, createBook);

// GET /api/books/search
router.get('/search', searchBooks);

// GET /api/books/:id
router.get('/:id', getBookById);

module.exports = router; 