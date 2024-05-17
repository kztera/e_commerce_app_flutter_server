const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { Product } = require('../models/product');
const orderController = require('./orders');
const emailSender = require('../helpers/email_sender');
const mailBuilder = require('../helpers/order_complete_email_builder');

exports.checkout = async function (req, res) {
  console.log("🐧  req:", req.body);
  const accessToken = req.header('Authorization').replace('Bearer', '').trim();
  const tokenData = jwt.decode(accessToken);
  
  return res.status(204).json({ message: 'Checkout successful' });
};