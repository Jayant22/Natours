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

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  const newTour = Object.assign({ id: tours.length }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'Failure',
          message: err.message,
        });
      }
      res.status(201).json({
        status: 'Success',
        result: 'User created',
        data: {
          newTour,
        },
      });
      console.log('File written successfully');
    }
  );
};

const getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'Failure',
      message: 'Tour not found',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

const updateTourById = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id == id);
  if (!tour) {
    res.status(404).json({
      status: 'Failure',
      message: 'Tour not found',
    });
  }
  const updated_tour = Object.assign({ id: tour.id }, req.body);
  const index = tours.indexOf(tour);
  tours[index] = updated_tour;
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'Failure',
          message: err.message,
        });
      }
      res.status(201).json({
        status: 'Success',
        result: 'User Updated',
        data: {
          updated_tour,
        },
      });
      console.log('File written successfully');
    }
  );
};

const deleteTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id == id);
  if (!tour) {
    res.status(404).json({
      status: 'Failure',
      message: 'Tour not found',
    });
  }
  const index = tours.indexOf(tour);
  tours.splice(index, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'Failure',
          message: err.message,
        });
      }
      res.status(201).json({
        status: 'Success',
        result: 'User Deleted',
        data: null,
      });
      console.log('File written successfully');
    }
  );
};

app.route('/Intours/v1/tours').get(getAllTours).post(createTour);

app
  .route('/Intours/v1/tours/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
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
