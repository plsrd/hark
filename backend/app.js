const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const postsRouter = require('./src/routes/posts');
const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');
const imagesRouter = require('./src/routes/images');

const authStrategies = require('./src/middleware/authStrategies');
const getAllContent = require('./src/middleware/getAllContent')

const app = express();

mongoose.connect(process.env.MONGO_DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

passport.use(authStrategies.local);
passport.use(authStrategies.jwt);

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER, set-cookie'
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);


  // Pass to next layer of middleware
  next();
});

app.use(
  '/api/all',
  passport.authenticate('jwt', { session: false }),
  getAllContent
);

app.use(
  '/api/posts',
  (req, res, next) => {
    console.log(req.headers) 
    next()
  },
  passport.authenticate('jwt', { session: false }),
  postsRouter
);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRouter
);

app.use(
  '/api/images',
  passport.authenticate('jwt', { session: false }),
  imagesRouter
);

app.use('/api/auth', authRouter);

module.exports = app;
