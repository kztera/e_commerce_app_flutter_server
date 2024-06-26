const { Decimal128 } = require('mongodb');
const { Schema, model } = require('mongoose');

const reviewSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  userName: { type: String, required: true },
  comment: { type: String, trim: true },
  rating: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

reviewSchema.set('toJSON', { virtuals: true })
reviewSchema.set('toObject', { virtuals: true });

exports.Review = model('Review', reviewSchema);
