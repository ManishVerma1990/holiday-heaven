const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("posts home route");
});

router.get("/new", (req, res) => {
  res.send("posts new route");
});

router.post("/", (req, res) => {
  res.send("posts post route");
});

router.delete("/:id", (req, res) => {
  res.send("posts delete route");
});

module.exports = router;
