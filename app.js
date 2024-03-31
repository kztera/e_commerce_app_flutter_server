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
const userRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const categoiesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');

app.use(`${API}`, authRouter);
app.use(`${API}/users`, userRouter);
app.use(`${API}/admin`, adminRouter);
app.use(`${API}/categories`, categoiesRouter);
app.use(`${API}/products`, productsRouter);
app.use('/public', express.static(__dirname + '/public'));

const hostname = env.HOST;
const port = env.PORT;

require('./helpers/cron_job');

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