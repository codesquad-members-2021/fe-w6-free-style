const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const authRouter = require('./routes/auth.js');
const methodOverride = require('method-override');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

mongoose
    .connect('mongodb://localhost/glogTest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'asdsda',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

app.use(methodOverride('_method'))


function authIsOwner(req, res) {
    if (req.session.is_logined) return true;
    else return false;
}

app.get('/', async (req, res) => {
    console.log(req.session);
    let owned = false;
    const articles = await Article.find().sort({ createdAt: 'desc' })
    if(authIsOwner(req, res)) owned = true;

    res.render("articles/index", {
        articles: articles,
        authStatus: authIsOwner(req, res)
    });
})



app.use('/auth', authRouter);
app.use('/articles', articleRouter);

app.listen(3000)
