const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/Intours/v1/tours', tourRouter);
app.use('/Intours/v1/users', userRouter);

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.get('/Intours/', (req, res) => {
  res.status(200).json('API World!');
});

module.exports = app;
