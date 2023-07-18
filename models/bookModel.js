const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  publisher: String,
  publishedDate: String,
  description: String,
  price: Number,
  googleLink: String,
  imageLink: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
