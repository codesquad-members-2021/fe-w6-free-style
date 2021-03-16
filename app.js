import express from 'express';
import ejs from 'ejs';
import path from 'path';
import dotenv from 'dotenv';

import vendorsRouter from './routes/vendors.js';
import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import todoRouter from './routes/todo.js';

const __dirname = path.resolve();

dotenv.config();
const app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.SERVER_PORT || 4000);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/vendors', vendorsRouter);
app.use('/', indexRouter); 
app.use('/auth', authRouter); 
app.use('/todo', todoRouter); 

const port = app.get('port');
app.listen(port, () => console.log(`http://localhost:${port}`));

export default app;
