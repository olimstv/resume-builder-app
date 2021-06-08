const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
const mongoURL =
  'mongodb+srv://demo123:demo123@letsgetit.kjoon.mongodb.net/letsgetIT?retryWrites=true&w=majority';
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
