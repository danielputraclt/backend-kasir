import express from 'express';
import logger from  'morgan';

import indexRouter from './routes/index.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})