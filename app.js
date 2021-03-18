const express = require('express');
const path = require('path');
const app = express();

app.set('port', 3000);
// app.set('views', __dirname+ '/views')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.locals.banner = require('./data/planningEvent.json');
app.locals.contents = require('./data/homeContents.json');

const indexRouter = require('./routes/index.js')
const itemsRouter = require('./routes/item-list.js')
app.use('/', indexRouter)
app.use('/item-list', itemsRouter)

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});