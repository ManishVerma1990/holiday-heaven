const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const revController = require("../controllers/reviews.js");

router.route("/").post(isLoggedIn, validateReview, wrapAsync(revController.createReview));

router.route("/:reviewId").delete(isLoggedIn, isReviewAuthor, wrapAsync(revController.deleteReview));

module.exports = router;
