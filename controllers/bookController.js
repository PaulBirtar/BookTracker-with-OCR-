const Book = require("../models/bookModel");

// Create a new book
exports.createBook = async (req, res) => {
  console.log("Here");
  try {
    const {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      price,
      googleLink,
      imageLink,
    } = req.body;

    // Create a new book instance using the Book model
    const newBook = new Book({
      title,
      authors,
      publisher,
      publishedDate,
      description,
      price,
      googleLink,
      imageLink,
    });

    newBook
      .save()
      .then((savedBook) => {
        res.status(201).json(savedBook); // Return the saved book as the response
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to add book" });
      });
  } catch (error) {
    console.log("Bad request");
    res.status(500).json({ error: error.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book by ID
exports.updateBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book by ID
exports.deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
