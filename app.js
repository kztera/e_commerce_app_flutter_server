const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const authJwt = require('./middlewares/jwt');
const errorHandler = require('./middlewares/error_handler');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
const env = process.env;
const API = env.API_URL;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use(errorHandler);

const authRouter = require('./routes/auth');

app.use(`${API}`, authRouter);
app.get(`${API}/products`, (req, res) => {
  return res.json({
    name: 'Product 1',
    price: 100,
  });
});

const hostname = env.HOST;
const port = env.PORT;

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});