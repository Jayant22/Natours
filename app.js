const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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

app.get('/Intours/', (req, res) => {
  res.status(200).json('API World!');
});

app.all('*', (req, res, next) => {
  next(new AppError(`Invalid endpoint ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
