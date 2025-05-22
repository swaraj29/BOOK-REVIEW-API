const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');

router.post('/books/:id/reviews', protect, createReview);
router.route('/reviews/:id')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router; 