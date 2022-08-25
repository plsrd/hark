const { format } = require('date-fns');
const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, required: true },
    mainImage: Object,
    content: [Object],
  },
  { timestamps: true }
);

PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

PostSchema.virtual('formattedDates').get(function () {
  return {
    ...(this.createdAt
      ? { createdAt: format(new Date(this.createdAt), 'MMM d yyyy') }
      : {}),
    ...(this.updatedAt
      ? { updatedAt: format(new Date(this.updatedAt), 'MMM d yyyy') }
      : {}),
  };
});

module.exports = mongoose.model('Post', PostSchema);
