const { validationResult } = require('express-validator');
const Post = require('../models/post');

//user id: 62f1c3b7d1193fff3d00215b

const handlePostInput = async (req, res, next) => {
  const errors = validationResult(req);
  const { title, author, content } = req.body;

  const fields = {
    title,
    author,
    content,
  };

  const createNewPost = () => {
    const newPost = new Post({ ...fields });
    newPost.save((err, createdPost) => {
      if (err) return next(err);
      res.json({
        message: 'Post created',
        createdPost,
      });
    });
  };

  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array(), fields });
  } else {
    createNewPost();
  }
};

module.exports = handlePostInput;
