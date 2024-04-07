require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ErrorHandler = require("./utils/errorHandler.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/javaScript")));

// const atlasUrl = process.env.ATLASDB_URL;
let atlasUrl = "mongodb+srv://maneeshverma1990:gxb2rBcq52w04zMV@cluster0.1evldr6.mongodb.net/?retryWrites=true&w=majority";

const store = MongoStore.create({
  mongoUrl: atlasUrl,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 60 * 60,
});

const sessionOptions = {
  store: store,
  // secret: process.env.SESSION_SECRET,
  secret: "THISISFAKESECRET",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function main() {
  await mongoose.connect(atlasUrl);
}
main()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen("8080", () => {
  console.log("app is listening");
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.redirect("listings");
});

//Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new ErrorHandler(404, "page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).render("listings/error.ejs", { err });
});
