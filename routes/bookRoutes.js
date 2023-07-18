const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Test route to check database connection
router.get("/test", (req, res) => {
  res.send("Database connection successful!");
});

//Routes for CRUD Operations

// Create a new book
router.post("/add", bookController.createBook);

// Get all books
router.get("/getAll", bookController.getAllBooks);

// Get a single book by ID
router.get("/:id", bookController.getBookById);

// Update a book by ID
router.put("/:id", bookController.updateBookById);

// Delete a book by ID
router.delete("/:id", bookController.deleteBookById);

module.exports = router;
