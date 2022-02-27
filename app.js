const express = require('express');
const fs = require('fs');

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.get('/Intours/', (req, res) => {
  res.status(200).json('API World!');
});

app.use(express.json());

app.get('/Intours/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

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

app.post('/Intours/v1/tours', (req, res) => {

  fs.readFile(`${__dirname}/dev-data/data/tours-simple.json`, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 'Failure',
        message: err.message,
      });
    } else {
      const latest_tours = JSON.parse(data);
      const newTour = Object.assign({ id: latest_tours.length }, req.body);
      latest_tours.push(newTour);
      fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(latest_tours),
        (err) => {
          if (err) {
            res.status(500).json({
              status: 'Failure',
              message: err.message,
            });
          } else {
            res.status(201).json({
              status: 'Success',
              result: 'User created',
              data: {
                newTour,
              },
            });
            console.log('File written successfully');
          }
        }
      );
    }
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
