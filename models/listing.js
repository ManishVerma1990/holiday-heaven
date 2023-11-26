const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { reviewSchema } = require("../schema");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  for (let review of listing.reviews) {
    await Review.findByIdAndDelete(review.toString());
  }
  // let res = await Review.deleteMany({ reviews: { $in: listing.reviews } });
});

module.exports = mongoose.model("Listing", listingSchema);
