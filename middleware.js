const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ErrorHandler = require("./utils/errorHandler.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "log in to create a new listing");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isListingOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  console.log(res.locals.currUser._id);
  if (!res.locals.currUser._id.equals(listing.owner)) {
    req.flash("error", "you don't have permission to make changes to this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    console.log("validation error");
    let errMsg = result.error.details.map((el) => el.message).join(",");
    next(new ErrorHandler(400, errMsg));
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!res.locals.currUser._id.equals(review.author)) {
    req.flash("error", "you don't have permission delete this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  let result = reviewSchema.validate(req.body);
  if (result.error) {
    let errMsg = result.error.details.map((el) => el.message).join(",");
    next(new ErrorHandler(400, errMsg));
  } else {
    next();
  }
};
