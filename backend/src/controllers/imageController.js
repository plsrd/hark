const Image = require('../models/image');
const getFilter = require('../middleware/getFilter');
const getSort = require('../middleware/getSort');
const parser = require('../middleware/parser');

exports.images_get = async (req, res, next) => {
  await Image.find(getFilter(req.query))
    .sort(getSort(req.query.sort))
    .limit(req.query.limit)
    .skip(req.query.skip)
    .then(posts => res.json(posts))
    .catch(err => next(err));
};

exports.images_post = [
  parser.single('image'),
  (req, res, next) => {
    const { filename, path } = req.file;
    const { alt, caption } = req.body;
    new Image({
      filename,
      url: path,
      ...(alt && { alt }),
      ...(caption && { caption }),
    }).save((err, image) => {
      console.log(image);
      if (err) return next(err);
      res.json({ image });
    });
  },
];

exports.image_get = (req, res, next) => {
  res.json({ message: 'Get an image' });
};

exports.image_put = (req, res, next) => {
  res.json({ message: 'Update an image' });
};

exports.image_delete = (req, res, next) => {
  res.json({ message: 'delete an image' });
};
