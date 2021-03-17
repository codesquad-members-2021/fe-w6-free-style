const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
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

// connect-flash 모듈을 사용하기 위해 express-session 모듈 사용
app.use(session({
    secret: 'cookiesecret_temp',    
}));
app.use(flash());

app.use('/vendors', vendorsRouter);
app.use('/', indexRouter); 
app.use('/auth', authRouter); 
app.use('/todo', todoRouter); 

const port = app.get('port');
app.listen(port, () => console.log(`http://localhost:${port}`));

module.exports = app;