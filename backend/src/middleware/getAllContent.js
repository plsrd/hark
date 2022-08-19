const Post = require('../models/post')
const Comment = require('../models/comment')
const Image = require('../models/image')
const User = require('../models/user')

const getAllContent = async (req, res, next) => {
  const posts = await Post.find().populate('author')
  const images = await Image.find()
  const authors = await User.find({role: {$in: ['admin', 'editor']}})

  res.json({
    posts, 
    images, 
    authors
  })
};

module.exports = getAllContent;
