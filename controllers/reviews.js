const { User } = require('../models/user');
const { Review } = require('../models/review');
const { Product } = require('../models/product');
const { default: mongoose } = require('mongoose');

exports.leaveReview = async function (req, res) {
  try {
    const user = await User.findById(req.body.user);
    if (!user) return res.status(404).json({ message: 'Invalid User!' });

    const review = await new Review({
      ...req.body,
      product: req.params.id,
      userName: user.name,
    }).save();

    if (!review) {
      return res.status(400).json({ message: 'The review could not be added' });
    }

    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // check if the user has already reviewed the product
    const existingReview = product.reviews.find(
      (reviewId) => reviewId.toString() === review.id
    );
    if (existingReview) {
      return res.status(409).json({ message: 'You have already reviewed this product' });
    }

    product.reviews.push(review.id);
    product = await product.save();

    if (!product)
      return res.status(500).json({ message: 'Internal Server Error' });
    return res.status(201).json({ product, review });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.getProductReviews = async function (req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Product not found' });
    }

    const page = req.query.page || 1;
    const pageSize = 10;

    const reviews = await Review.find({ _id: { $in: product.reviews } })
      .sort({ date: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!reviews) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Reviews not found' });
    }

    const count = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    }

    for (const review of reviews) {
      count[review.rating] += 1;
    }

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    const processedReviews = [];

    for (const review of reviews) {
      const user = await User.findById(review.user);
      if (!user) {
        processedReviews.push(review);
        continue;
      }
      let newReview;
      if (review.userName !== user.name) {
        review.userName = user.name;
        newReview = await review.save({ session });
      }
      processedReviews.push(newReview ?? review);
    }
    await session.commitTransaction();
    const result = {
      reviews: processedReviews,
      averageRating,
      count,
    }
    return res.json(result);
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return res.status(500).json({ type: error.name, message: error.message });
  } finally {
    await session.endSession();
  }
};

exports.removeReview = async function (req, res) {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.reviews = product.reviews.filter(
      (reviewId) => reviewId.toString() !== req.params.reviewId
    );

    await product.save();
    return res.status(204).json({ message: 'Review removed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
}