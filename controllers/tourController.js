const fs = require('fs');

const tourFileName = `${__dirname}/../dev-data/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(tourFileName));

exports.checkID = (req, res, next, val) => {
  console.log(`Tour ID is ${val}`);
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'Failure',
      message: 'Tour not found',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Failure',
            message: 'Missing name or price',
        });
    }   
    next();
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  const newTour = Object.assign({ id: tours.length + 1 }, req.body);
  tours.push(newTour);
  fs.writeFile(tourFileName, JSON.stringify(tours), (err) => {
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
  });
};

exports.getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

exports.updateTourById = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id == id);
  
  const updated_tour = Object.assign({ id: tour.id }, req.body);
  const index = tours.indexOf(tour);
  tours[index] = updated_tour;
  fs.writeFile(tourFileName, JSON.stringify(tours), (err) => {
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
  });
};

exports.deleteTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id == id);
  
  const index = tours.indexOf(tour);
  tours.splice(index, 1);
  fs.writeFile(tourFileName, JSON.stringify(tours), (err) => {
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
  });
};
