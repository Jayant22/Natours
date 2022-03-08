const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/Intours/v1/tours', tourRouter);
app.use('/Intours/v1/users', userRouter);

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.get('/Intours/', (req, res) => {
  res.status(200).json('API World!');
});

module.exports = app;
// app.post('/Intours/v1/tours', (req, res) => {
//   const newTour = Object.assign({ id: tours.length }, req.body);
//   const latest_tours = [...tours, newTour];

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(latest_tours),
//     (err) => {
//       if (err) {
//         res.status(500).json({
//           status: 'Failure',
//           message: err.message,
//         });
//       } else {
//         res.status(201).json({
//           status: 'Success',
//           result: 'User created',
//           data: {
//             newTour,
//           },
//         });
//       }
//     }
//   );
// });
