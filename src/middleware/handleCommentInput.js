const { validationResult } = require('express-validator');
const Comment = require('../models/comment');

const handleCommentInput = (req, res, next) => {
  const errors = validationResult(req);
  const { author, content } = req.body;
  const { role, _id } = req.user;

  const fields = {
    author,
    post: req.params.postid,
    content,
  };

  const createNewComment = () => {
    const comment = new Comment(fields);
    comment.save((err, createdComment) => {
      if (err) return next(err);

      res.json({
        message: 'Comment created',
        createdComment,
      });
    });
  };

  const updateComment = () => {
    if (role !== 'admin' && author !== _id.toString()) {
      return res
        .status(401)
        .send({ message: 'Editors may only edit their own content' });
    }
    Comment.findByIdAndUpdate(req.params.commentid, fields, { new: true }).exec(
      (err, updatedComment) => {
        if (err) return next(err);

        res.json({
          message: 'Comment updated',
          updatedComment,
        });
      }
    );
  };

  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array(), fields });
  } else {
    req.method == 'POST' ? createNewComment() : updateComment();
  }
};

module.exports = handleCommentInput;
