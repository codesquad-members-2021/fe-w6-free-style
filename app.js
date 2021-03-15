const express = require('express');
const path = require('path');

const mainRouter = require('./routes/main');

const app = express();

app.set('views', path.join(__dirname, 'public/main/views'));
app.set('view engine', 'ejs');

app.listen(3000, function() {
    console.log('서버 오픈');
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', mainRouter);

module.exports = app;