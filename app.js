var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require("./router/index");
var mongoose = require('mongoose');


app.listen(3000, function () {
   console.log('🎉started')
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: true
}))
app.set('view engine', 'ejs')
app.use(router) //main접속시 main_router로 이동

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
   // CONNECTED TO MONGODB SERVER
   console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
})