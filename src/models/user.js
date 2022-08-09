const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  this.password = await bcrypt.hash(user.password, 10);
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  this._update.password = await bcrypt.hash(this._update.password, 10);
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
