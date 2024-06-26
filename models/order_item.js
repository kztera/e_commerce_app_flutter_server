const { Schema, model } = require('mongoose');

const orderItemSchema = Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  productAuthorName: { type: String, required: true },
  productName: { type: String, required: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productSaleOff: { type: Number, default: 0 },
  hasReview: { type: Boolean, default: false },
});

orderItemSchema.set('toObject', { virtuals: true });
orderItemSchema.set('toJSON', { virtuals: true });

exports.OrderItem = model('OrderItem', orderItemSchema);
