const express = require("express");
const app = express();
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const { name } = require("ejs");
const path = require("path");

app.set("viewengine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = { secret: "wrongSecureMethod", resave: false, saveUninitialized: true };

app.use(session(sessionOptions));
app.use(flash());

app.listen("4090", () => {
  console.log("app is listening to port 4090");
});

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { name = "unnamed" } = req.query;
  req.session.name = name;
  if (name === "unnamed") {
    req.flash("error", "please enter a name");
  } else {
    req.flash("success", "user registerd successfully");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.locals.success = req.flash("success");
  res.render("page.ejs", { name: req.session.name });
});

// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(`you sent a request ${req.session.count} times`);
// });

// app.use(cookieParser("secure code"));

// app.use("/user", users);
// app.use("/user/:id/post", posts);

// app.get("/getcookies", (req, res) => {
//   res.cookie("country", "india");
//   res.cookie("currency", "rupee");
//   res.send("sent cookie");
// });

// app.get("/getsignedcookies", (req, res) => {
//   res.cookie("color", "black", { signed: true });
//   res.send("sent signed cookies");
// });

// app.get("/signed", (req, res) => {

//   console.dir(req.cookies);
//   res.send("signed route");
// });

// app.get("/", (req, res) => {
//   console.dir(req.cookies);
//   res.send("root route");
// });

// app.get("/name", (req, res) => {
//   let { name = "anonymus" } = req.cookies;
//   res.send(`hi, ${name}`);
// });
