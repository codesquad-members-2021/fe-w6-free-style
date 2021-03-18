const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const ejs = require('ejs');

dotenv.config();

const vendorsRouter = require('./routes/vendors.js');
const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');
const todoRouter = require('./routes/todo.js');
const { sequelize } = require("./models");

const app = express();
sequelize.sync(); 

app.locals.pretty = true;

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.SERVER_PORT || 4000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/vendors', vendorsRouter);
app.use('/', indexRouter); 
app.use('/auth', authRouter); 
app.use('/todo', todoRouter); 

const port = app.get('port');
app.listen(port, () => console.log(`http://localhost:${port}`));

module.exports = app;