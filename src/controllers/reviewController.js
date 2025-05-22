const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Create a new review
// @route   POST /api/books/:id/reviews
// @access  Private
const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const bookId = req.params.id;

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if user already reviewed this book
        const existingReview = await Review.findOne({
            book: bookId,
            user: req.user._id,
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this book' });
        }

        const review = await Review.create({
            book: bookId,
            user: req.user._id,
            rating,
            comment,
        });

        // Update book's average rating and total reviews
        const reviews = await Review.find({ book: bookId });
        const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
        book.averageRating = totalRating / reviews.length;
        book.totalReviews = reviews.length;
        await book.save();

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user owns the review
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { rating, comment } = req.body;
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        const updatedReview = await review.save();

        // Update book's average rating
        const reviews = await Review.find({ book: review.book });
        const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
        const book = await Book.findById(review.book);
        book.averageRating = totalRating / reviews.length;
        await book.save();

        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user owns the review
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Review.deleteOne({ _id: req.params.id });

        // Update book's average rating and total reviews
        const reviews = await Review.find({ book: review.book });
        const book = await Book.findById(review.book);
        
        if (reviews.length === 0) {
            book.averageRating = 0;
            book.totalReviews = 0;
        } else {
            const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
            book.averageRating = totalRating / reviews.length;
            book.totalReviews = reviews.length;
        }
        
        await book.save();

        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createReview,
    updateReview,
    deleteReview,
}; 