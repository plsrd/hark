const { validationResult } = require('express-validator');
const Post = require('../models/post');

const handlePostInput = (req, res, next) => {
  const errors = validationResult(req);
  const { title, author, content, isPublished } = req.body;
  const { role, _id } = req.user;

  const fields = {
    title,
    author,
    content,
    isPublished,
  };

  const createNewPost = () => {
    const newPost = new Post(fields);
    if (role == 'viewer')
      return res.status(401).send({ message: 'Viewers may not create posts' });

    newPost.save((err, createdPost) => {
      if (err) return next(err);
      res.json({
        message: 'Post created',
        createdPost,
      });
    });
  };

  const updatePost = () => {
    if (role == 'viewer') {
      return res.status(401).send({ message: 'Viewers may not edit posts' });
    } else if (role == 'editor' && author !== _id.toString()) {
      return res
        .status(401)
        .send({ message: 'Editors may only edit their own content' });
    }

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
