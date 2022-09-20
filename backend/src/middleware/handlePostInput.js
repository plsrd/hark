const { validationResult } = require('express-validator');
const Post = require('../models/post');

const handlePostInput = (req, res, next) => {
  const errors = validationResult(req);
  const { title, author, content, isPublished } = req.body;
  const { role, _id } = req.user;

  const postFields = {
    title,
    author,
    content,
    isPublished,
    mainImage,
  };

  const createNewPost = () => {
    const newPost = new Post(postFields);
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
    Object.keys(postFields).forEach(key =>
      postFields[key] === '' ? delete postFields[key] : {}
    );

    if (role == 'viewer') {
      return res.status(401).send({ message: 'Viewers may not edit posts' });
    } else if (role == 'editor' && author !== _id.toString()) {
      return res
        .status(401)
        .send({ message: 'Editors may only edit their own content' });
    }

    Post.findByIdAndUpdate(req.params.postid, postFields, { new: true }).exec(
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
    res.status(422).send({
      errors: errors.array(),
      fields: { title, author, content, isPublished },
    });
  } else {
    req.method == 'POST' ? createNewPost() : updatePost();
  }
};

module.exports = handlePostInput;
