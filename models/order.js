const { Schema, model } = require('mongoose');

const orderSchema = Schema({
  orderItems: [
    { type: Schema.Types.ObjectId, ref: 'OrderItem', required: true },
  ],
  email: { type: String, required: true },
  paymentId: String,
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: [
      'pending',
      'delivered',
    ],
  },
  statusHistory: {
    type: [String],
    enum: [
      'pending',
      'delivered',
    ],
    required: true,
    default: ['pending'],
  },
  totalPrice: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateOrdered: { type: Date, default: Date.now },
});

orderSchema.virtual('orderItem', {
  ref: 'OrderItem',
  localField: 'orderItems',
  foreignField: '_id',
  justOne: false,
})

orderSchema.set('toObject', { virtuals: true });
orderSchema.set('toJSON', { virtuals: true });

exports.Order = model('Order', orderSchema);
