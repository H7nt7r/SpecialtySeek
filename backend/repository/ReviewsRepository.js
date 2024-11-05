const Review = require('../models/Reviews');

const createReview = async (reviewData) => {
  const review = await Review.create(reviewData);
  return review;
};

const getReviewById = async (reviewId) => {
  const review = await Review.findByPk(reviewId);
  return review;
};

const updateReview = async (reviewId, reviewData) => {
  const review = await Review.findByPk(reviewId);
  await review.update(reviewData);
  return review;
};

const deleteReview = async (reviewId) => {
  const review = await Review.findByPk(reviewId);
  await review.destroy();
};

const getAllReviews = async () => {
  const reviews = await Review.findAll();
  return reviews;
};

const getReviewsByUniversityId = async (universityId) => {
 const reviews = await Review.findAll({
    where: { university_id: universityId },
  });
  return reviews;
};

module.exports = {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviews,
  getReviewsByUniversityId,
};
