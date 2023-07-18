const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const bookRoutes = require("./routes/bookRoutes");
const navbarRoutes = require("./routes/navbarRoutes");

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Book Routes
app.use("/api/books", bookRoutes);

// Navbar routes
app.use("/", navbarRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
