const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const authJwt = require('./middlewares/jwt');
const errorHandler = require('./middlewares/error_handler');
const authorizePostRequests = require('./middlewares/authorization');

const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
const env = process.env;
const API = env.API_URL;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(authJwt().unless({ path: [/\/public\//] }));
app.use(authorizePostRequests);
app.use(errorHandler);

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const authorsRouter = require('./routes/authors');
const checkoutRouter = require('./routes/checkout');

app.use(`${API}`, authRouter);
app.use(`${API}/users`, userRouter);
app.use(`${API}/admin`, adminRouter);
app.use(`${API}/categories`, categoriesRouter);
app.use(`${API}/products`, productsRouter);
app.use(`${API}/authors`, authorsRouter);
app.use(`${API}/checkout`, checkoutRouter);
app.use('/public', express.static(__dirname + '/public'));

const port = env.PORT || 3333;

require('./helpers/cron_job');

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});