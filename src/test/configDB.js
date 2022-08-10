const mongoose = require('mongoose');
require('dotenv').config();

const configDB = () => {
  // Connect to Mongoose
  beforeAll(async () => {
    mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });
  });
  // Disconnect Mongoose
  afterAll(async () => {
    await mongoose.connection.close();
  });
};

module.exports = configDB;
