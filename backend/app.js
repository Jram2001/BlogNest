const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database')
// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const blogsRouter = require('./routes/blog.routes');

const app = express();

const connection = connectDB();

app.use(cors())

// ===== VIEW ENGINE SETUP =====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ===== MIDDLEWARE =====
// Logging
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// ===== ROUTES =====
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ===== ERROR HANDLING =====
// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Global error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Log errors in production
  if (req.app.get('env') === 'production') {
    console.error('Error:', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method
    });
  }

  // Render error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
