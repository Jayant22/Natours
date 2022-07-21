const tourModel = require('../models/tourModel');
const APIInterface = require('../utils/apiInterface');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res) => {
  // eslint-disable-next-line prettier/prettier
  const feature = new APIInterface(tourModel.find().populate(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await feature.query;

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
});

exports.createTour = catchAsync(async (req, res) => {
  const newTour = await tourModel.create(req.body);

  res.status(201).json({
    status: 'Success',
    result: 'User created',
    data: {
      tour: newTour,
    },
  });
});

exports.getTourById = catchAsync(async (req, res, next) => {
  const tour = await tourModel.findById(req.params.id).populate('reviews');

  if (!tour) {
    return next(new AppError(`No tour found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

exports.updateTourById = catchAsync(async (req, res, next) => {
  const updatedTour = await tourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTour) {
    return next(new AppError(`No tour found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'Success',
    result: 'Tour updated',
    data: {
      tour: updatedTour,
    },
  });
});

exports.deleteTourById = catchAsync(async (req, res, next) => {
  const tour = await tourModel.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError(`No tour found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'Success',
    result: 'Tour deleted',
    data: {
      tour,
    },
  });
});

exports.getTourStats = catchAsync(async (req, res) => {
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
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
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
});
