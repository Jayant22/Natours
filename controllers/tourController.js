const tourModel = require('../models/tourModel');

//const tourFileName = `${__dirname}/../dev-data/data/tours-simple.json`;

// const tours = JSON.parse(fs.readFileSync(tourFileName));

// exports.checkID = (req, res, next, val) => {
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'Failure',
//       message: 'Tour not found',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'Failure',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await tourModel.find();

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await tourModel.create(req.body);

    res.status(201).json({
      status: 'Success',
      result: 'User created',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failure',
      message: err,
    });
  }

  // const newTour = Object.assign({ id: tours.length + 1 }, ...req.body);
  // tours.push(newTour);
  // fs.writeFile(tourFileName, JSON.stringify(tours), (err) => {
  //   if (err) {
  //     res.status(500).json({
  //       status: 'Failure',
  //       message: err.message,
  //     });
  //   }
  //   res.status(201).json({
  //     status: 'Success',
  //     result: 'User created',
  //     data: {
  //       newTour,
  //     },
  //   });
  // });
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await tourModel.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      result: 'Tour found',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: error,
    });
  }
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.updateTourById = async (req, res) => {
  try {
    const updatedTour = await tourModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      result: 'Tour updated',
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: error,
    });
  }

  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // const updatedTour = Object.assign({ id: tour.id }, ...req.body);
  // const index = tours.indexOf(tour);
  // tours[index] = updatedTour;
  // fs.writeFile(tourFileName, JSON.stringify(tours), (err) => {
  //   if (err) {
  //     res.status(500).json({
  //       status: 'Failure',
  //       message: err.message,
  //     });
  //   }
  //   res.status(201).json({
  //     status: 'Success',
  //     result: 'User Updated',
  //     data: {
  //       updatedTour,
  //     },
  //   });
  // });
};

exports.deleteTourById = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'Success',
      result: 'Tour deleted',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: error,
    });
  }
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // const index = tours.indexOf(tour);
  // tours.splice(index, 1);
  // fs.writeFile(tourFileName, JSON.stringify(tours), (err) => {
  //   if (err) {
  //     res.status(500).json({
  //       status: 'Failure',
  //       message: err.message,
  //     });
  //   }
  //   res.status(201).json({
  //     status: 'Success',
  //     result: 'User Deleted',
  //     data: null,
  //   });
  // });
};
