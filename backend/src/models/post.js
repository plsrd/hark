const { format } = require('date-fns');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, required: true },
    slug: { type: String, required: true },
    mainImage: { type: Schema.Types.ObjectId, ref: 'Image' },
    content: [Object],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
