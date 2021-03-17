const express = require('express');
const path = require('path');
const app = express();

const indexRouter = require('./routes/index');
const imageRouter = require('./routes/image');
const pageRouter = require('./routes/pages');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/image', imageRouter);
app.use('/page', pageRouter);

//에러핸들링
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

