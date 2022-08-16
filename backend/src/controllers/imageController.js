const Image = require('../models/image');
const getFilter = require('../middleware/getFilter');
const getSort = require('../middleware/getSort');

exports.images_get = async (req, res, next) => {
  await Image.find(getFilter(req.query))
    .sort(getSort(req.query.sort))
    .limit(req.query.limit)
    .skip(req.query.skip)
    .then(posts => res.json(posts))
    .catch(err => next(err));
};

exports.images_post = (req, res, next) => {
  res.json({ message: 'Upload an image' });
};

exports.image_get = (req, res, next) => {
  res.json({ message: 'Get an image' });
};

exports.image_put = (req, res, next) => {
  res.json({ message: 'Update an image' });
};

exports.image_delete = (req, res, next) => {
  res.json({ message: 'delete an image' });
};
