const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  content: [{ type: Object }],
  timestamps: true,
});

module.exports = mongoose.model('Comment', CommentSchema);
