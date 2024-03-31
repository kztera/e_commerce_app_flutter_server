const { Schema, model } = require('mongoose');

const authorSchema = Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  products: [
    {type: Schema.Types.ObjectId, ref: 'Product', required: true},
  ],
  isDisabled: { type: Boolean, default: false },
});

authorSchema.set('toObject', { virtuals: true });
authorSchema.set('toJSON', { virtuals: true });
  