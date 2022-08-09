const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const postsRouter = require('./src/routes/posts');
const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');
const loginStrategy = require('./src/middleware/auth');

const app = express();

mongoose.connect(process.env.MONGO_DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

passport.use(loginStrategy);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/login', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

module.exports = app;
