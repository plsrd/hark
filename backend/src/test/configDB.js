const mongoose = require('mongoose');
require('dotenv').config();

const configDB = () => {
  // Connect to Mongoose
  beforeAll(async () => {
    mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });
  });
  // Disconnect Mongoose
  afterAll(done => {
    mongoose.connection.close();
    done();
  });
};

module.exports = configDB;
