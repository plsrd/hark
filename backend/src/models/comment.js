const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    content: [{ type: Object }],
    isApproved: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

CommentSchema.set('toObject', { virtuals: true });
CommentSchema.set('toJSON', { virtuals: true });

CommentSchema.virtual('formattedDates').get(function () {
  return {
    ...(this.createdAt
      ? { createdAt: format(new Date(this.createdAt), 'MMM d yyyy') }
      : {}),
    ...(this.updatedAt
      ? { updatedAt: format(new Date(this.updatedAt), 'MMM d yyyy') }
      : {}),
  };
});

module.exports = mongoose.model('Comment', CommentSchema);
