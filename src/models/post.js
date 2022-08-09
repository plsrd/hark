const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    content: [Object],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
