const { Schema, model } = require('mongoose');

const cartSchema = Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
});

cartSchema.set('toObject', { virtuals: true });
cartSchema.set('toJSON', { virtuals: true });

exports.Cart = model('Cart', cartSchema);
