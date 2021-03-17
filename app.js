const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




app.use(express.static('public'))

app.listen(3000, function () {
    console.log("start! express server on port 3000")
})


app.set('view engine', 'ejs');


app.get('/main', function (req, res) {
    res.render("main")
})

app.post('/login', function (req, res) {
    if (req.body.login == 1301) {
        res.render('loginSuccess')
    } else {
        res.render('loginFail', { 'login': req.body.login });
    }
})

app.get('/write', function (req, res) {
    res.render('write');
})