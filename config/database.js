const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connects to the mongo database
    await mongoose.connect('mongodb://localhost:27017/BookTracker', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
