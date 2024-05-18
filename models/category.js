const { Schema, model } = require('mongoose');

const categorySchema = Schema({
  name: { type: String, required: true },
  colour: { type: String, default: '#000000' },
  image: { type: String, required: true },
  products: [
    {type: Schema.Types.ObjectId, ref: 'Product', required: true},
  ],
  isDisable: { type: Boolean, default: false },
});

categorySchema.virtual('product', {
  ref: 'Product',
  localField: 'products',
  foreignField: '_id',
  justOne: false,
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

exports.Category = model('Category', categorySchema);
