const express = require("express");
const router = express.Router();

// Custom routes for navbar
router.get("/home", (req, res) => {
  res.send("Home Page");
});

router.get("/search", (req, res) => {
  res.send("Search Page");
});

router.get("/my-books", (req, res) => {
  res.send("My Books Page");
});

module.exports = router;
