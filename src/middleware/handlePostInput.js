const { validationResult } = require('express-validator');
const Post = require('../models/post');

const handlePostInput = (req, res, next) => {
  const errors = validationResult(req);
  const { title, author, content } = req.body;

  const fields = {
    title,
    author,
    content,
  };

  const createNewPost = () => {
    const newPost = new Post(fields);
    newPost.save((err, createdPost) => {
      if (err) return next(err);
      res.json({
        message: 'Post created',
        createdPost,
      });
    });
  };

  const updatePost = () => {
    Post.findByIdAndUpdate(req.params.postid, fields, { new: true }).exec(
      (err, updatedPost) => {
        if (err) return next(err);
        res.json({
          message: 'Post updated',
          updatedPost,
        });
      }
    );
  };

  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array(), fields });
  } else {
    req.method == 'POST' ? createNewPost() : updatePost();
  }
};

module.exports = handlePostInput;
