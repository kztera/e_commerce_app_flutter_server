const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.js');
const reviewsController = require('../controllers/reviews');

router.get('/', productsController.getProducts);
router.get('/search', productsController.searchProducts);

router.get('/:id', productsController.getProductById);
router.get('/authors/:id', productsController.getProductsByAuthorId);
router.post('/:id/reviews', reviewsController.leaveReview);
router.get('/:id/reviews', reviewsController.getProductReviews);
router.delete('/:id/reviews/:reviewId', reviewsController.removeReview);

module.exports = router;
