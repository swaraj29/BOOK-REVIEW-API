const Book = require('../models/Book');
const Review = require('../models/Review');

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
    try {
        const { title, author, genre, description } = req.body;
        const book = await Book.create({
            title,
            author,
            genre,
            description,
        });
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all books with pagination and filters
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const author = req.query.author;
        const genre = req.query.genre;

        const query = {};
        if (author) query.author = author;
        if (genre) query.genre = genre;

        const books = await Book.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Book.countDocuments(query);

        res.json({
            books,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get book by ID with reviews
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const reviews = await Review.find({ book: req.params.id })
            .populate('user', 'username')
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const totalReviews = await Review.countDocuments({ book: req.params.id });

        res.json({
            book,
            reviews,
            page,
            pages: Math.ceil(totalReviews / limit),
            totalReviews,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Search books
// @route   GET /api/search
// @access  Public
const searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        const books = await Book.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        )
            .sort({ score: { $meta: 'textScore' } })
            .limit(10);

        res.json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBookById,
    searchBooks,
}; 