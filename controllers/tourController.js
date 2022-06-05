const tourModel = require('../models/tourModel');
const APIInterface = require('../utils/apiInterface');

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

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //1A Filtering
    // const queryObj = { ...req.query };
    // const excludeQuery = ['page', 'sort', 'limit', 'fields'];

    // excludeQuery.forEach((el) => delete queryObj[el]);
    // let queryStr = JSON.stringify(queryObj);

    // //1B Advanced Filtering
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //let query = tourModel.find(JSON.parse(queryStr));

    // //2 Sorting
    // if (req.query.sort) {
    //   const sortedBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortedBy);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // //3 Fields Limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }

    // //4 Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // if (req.query.page) {
    //   const noOfTours = await tourModel.countDocuments();
    //   if (skip >= noOfTours) {
    //     throw new Error('This page does not exist');
    //   }
    // }
    // query = query.skip(skip).limit(limit);

    const feature = new APIInterface(tourModel.find(), req.query).filter().sort().limitFields().paginate();

    const tours = await feature.query;

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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await tourModel.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await tourModel.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
