const mongoose = require("mongoose");
const initData = require("./data2.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/holiday-heaven";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66140b8ba71261b4d1ce82c1",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
