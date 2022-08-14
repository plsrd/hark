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

const authStrategies = require('./src/middleware/authStrategies');

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);

app.use(
  '/api/posts',
  passport.authenticate('jwt', { session: false }),
  postsRouter
);
app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRouter
);

app.use('/api/auth', authRouter);

module.exports = app;
