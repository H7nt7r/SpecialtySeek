const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewController');

const { validateReview } = require('../middle/reviewShema');

router.post('/', validateReview, reviewsController.createReview);
router.get('/university/:universityId', reviewsController.getReviewsByUniversityId);
router.get('/:id', reviewsController.getReviewById);
router.delete('/:id', reviewsController.deleteReview);
router.put('/:id', validateReview, reviewsController.updateReview);

module.exports = router;
