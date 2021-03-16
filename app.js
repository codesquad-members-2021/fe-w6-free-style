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
const itemsRouter = require('./routes/list-item.js')
app.get('/', indexRouter)
app.get('/list-item', itemsRouter)

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});