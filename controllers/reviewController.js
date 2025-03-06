const Review = require('../models/reviewModel');
const APIInterface = require('../utils/apiInterface');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.params.tourId) filter.tour = req.params.tourId;
  const feature = new APIInterface(Review.find().populate(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await feature.query;

  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      reviews: reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'Success',
    result: 'Review created',
    data: {
      review: newReview,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError(`No review found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      review: Review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedReview) {
    return next(new AppError(`No review found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'Success',
    result: 'Review updated',
    data: {
      review: updatedReview,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const deletedReview = await Review.findByIdAndDelete(req.params.id);
  if (!deletedReview) {
    return next(new AppError(`No review found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'Success',
    result: 'Review deleted',
    data: {
      review: deletedReview,
    },
  });
});
