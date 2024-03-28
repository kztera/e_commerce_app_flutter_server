const { Schema, model } = require('mongoose');

const orderSchema = Schema({
  orderItems: [
    { type: Schema.Types.ObjectId, ref: 'OrderItem', required: true },
  ],
  phone: { type: String, required: true },
  paymentId: String,
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: [
      'pending',
      'errors',
      'delivered',
      'cancelled',
    ],
  },
  statusHistory: {
    type: [String],
    enum: [
      'pending',
      'errors',
      'delivered',
      'cancelled',
    ],
    required: true,
    default: ['pending'],
  },
  totalPrice: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateOrdered: { type: Date, default: Date.now },
});

orderSchema.set('toObject', { virtuals: true });
orderSchema.set('toJSON', { virtuals: true });

exports.Order = model('Order', orderSchema);
