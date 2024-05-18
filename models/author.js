const { Schema, model } = require('mongoose');

const authorSchema = Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  products: [
    { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  ],
  productCount: { type: Number, default: 0 },
  isDisabled: { type: Boolean, default: false },
});

authorSchema.virtual('product', {
  ref: 'Product',
  localField: 'products',
  foreignField: '_id',
  justOne: false,
});

authorSchema.pre('save', async function (next) {
  this.productCount = this.products.length;
  next();
});

authorSchema.set('toObject', { virtuals: true });
authorSchema.set('toJSON', { virtuals: true });

exports.Author = model('Author', authorSchema);