const { Schema, model } = require('mongoose');
const userSchema = Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String, required: true, trim: true, validate: {
      validator: (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`
    }
  },
  passwordHash: { type: String, required: true },
  street: String,
  apartment: String,
  city: String,
  zip: String,
  country: String,
  isAdmin: { type: Boolean, default: false },
  phone: {
    validate: {
      validator: (value) => {
        return /^[\d]{10}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`
    }
  },
  resetPasswordOtp: Number,
  resetPasswordOtpExpires: { type: Date, default: Date.now },
  wishlist: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
      productName: { type: String, required: true },
      productImage: { type: String, required: true },
      productPrice: { type: Number, required: true },
    }
  ],
});

userSchema.index({ email: 1 }, { unique: true });

exports.UserModel = model('User', userSchema);