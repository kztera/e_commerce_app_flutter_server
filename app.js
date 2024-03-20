const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
const env = process.env
const hostname = env.HOST;
const port = env.PORT;

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
app.use('/auth', authRouter);
app.use('/products', productsRouter);

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());

mongoose.connect(env.MONGO_URI).then(() => {
  console.log('Database connected');
}).catch(err => {
  console.log('Error: ', err);
})

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});