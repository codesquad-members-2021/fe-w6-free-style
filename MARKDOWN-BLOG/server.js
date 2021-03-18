const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const loginRouter = require('./routes/logins.js');
const methodOverride = require('method-override');
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

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render("articles/index", { articles: articles });
})



app.use('/login', loginRouter);
app.use('/articles', articleRouter);

app.listen(3000)
