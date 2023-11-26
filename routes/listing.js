const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isListingOwner, validateListing } = require("../middleware.js");
const lisController = require("../controllers/listings.js");
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/").get(wrapAsync(lisController.index));

router
  .route("/new")
  .get(isLoggedIn, lisController.renderNewForm)
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(lisController.createListing));

router
  .route("/:id")
  .get(wrapAsync(lisController.showListing))
  .put(isLoggedIn, isListingOwner, upload.single("listing[image]"), validateListing, wrapAsync(lisController.updateListing))
  .delete(isLoggedIn, isListingOwner, wrapAsync(lisController.deleteListing));

router.route("/:id/edit").get(isLoggedIn, isListingOwner, wrapAsync(lisController.renderEditForm));

module.exports = router;
