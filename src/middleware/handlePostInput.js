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
  console.log(req.user);
  const createNewPost = () => {
    const newPost = new Post(fields);
    if (role == 'viewer')
      return res
        .status(401)
        .send({ message: 'You must be an admin or editor to create a post' });

    newPost.save((err, createdPost) => {
      if (err) return next(err);

      if (role == 'viewer') {
        return res
          .status(401)
          .send({ message: 'You must be an admin or editor to create a post' });
      }
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

        if (role == 'viewer') {
          return res
            .status(401)
            .send({ message: 'You must be an admin or editor to edit a post' });
        } else if (role == 'editor' && author !== _id.toString()) {
          return res
            .status(401)
            .send({ message: 'Editors may only edit their own content' });
        }

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
