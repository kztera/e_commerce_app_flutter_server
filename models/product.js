const { Decimal128 } = require('mongodb');
const { Schema, model } = require('mongoose');

const productSchema = Schema({
  name: { type: String, required: true },
  authors: [
    {type: Schema.Types.ObjectId, ref: 'Author', required: true},
  ],
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Decimal128, default: 0.0 },
  saleOff: { type: Number, default: 0 },
  image: { type: String, required: true },
  images: [{ type: String }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  numberOfReviews: { type: Number, default: 0 },
  categories: [
    { type: Schema.Types.ObjectId, ref: 'Category', required: true }
  ],
  dateAdded: { type: Date, default: Date.now },
  source: { type: String, required: true },
  numOfDownloads: { type: Number, default: 0 },
  numOfLikes: { type: Number, default: 0 },
});

productSchema.virtual('author', {
  ref: 'Author',
  localField: 'authors',
  foreignField: '_id',
  justOne: false,
});

productSchema.virtual('category', {
  ref: 'Category',
  localField: 'categories',
  foreignField: '_id',
  justOne: false,
});

productSchema.virtual('review', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

// pre-save hook
productSchema.pre('save', async function (next) {
  if (this.reviews.length > 0) {
    await this.populate('reviews');

    const totalRating = this.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );

    this.rating = totalRating / this.reviews.length;
    this.rating = parseFloat((totalRating / this.reviews.length).toFixed(1));
    this.numberOfReviews = this.reviews.length;
  }
  next();
});

productSchema.index({ name: 'text', description: 'text' });

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret.rating && ret.rating.toString) {
      ret.rating = parseFloat(ret.rating.toString());
    }
    return ret;
  }
});

exports.Product = model('Product', productSchema);
