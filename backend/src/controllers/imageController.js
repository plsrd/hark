const Image = require('../models/image');
const getFilter = require('../middleware/getFilter');
const getSort = require('../middleware/getSort');
const cloudinary = require('../middleware/cloudinary');

exports.images_get = async (req, res, next) => {
  await Image.find(getFilter(req.query))
    .sort(getSort(req.query.sort))
    .limit(req.query.limit)
    .skip(req.query.skip)
    .then(images => res.json(images))
    .catch(err => next(err));
};

exports.images_post = [
  cloudinary.parser.single('image'),
  (req, res, next) => {
    const { filename, path } = req.file;
    const { alt, caption } = req.body;
    new Image({
      filename,
      url: path,
      ...(alt && { alt }),
      ...(caption && { caption }),
    }).save((err, image) => {
      if (err) return next(err);
      res.json({ message: 'Image created', image });
    });
  },
];

exports.image_get = async (req, res, next) => {
  await Image.findById(req.params.imageid)
    .then(image => res.json(image))
    .catch(err => next(err));
};

exports.image_put = async (req, res, next) => {
  const { alt, caption } = req.body;

  const imageFields = {
    alt,
    caption,
  };

  Object.keys(imageFields).forEach(key =>
    imageFields[key] === '' ? delete imageFields[key] : {}
  );

  await Image.findByIdAndUpdate(req.params.imageid, imageFields, {
    new: true,
  })
    .then(image => res.json({ message: 'Image updated', image }))
    .catch(err => next(err));
};

exports.image_delete = async (req, res, next) => {
  const image = await Image.findById(req.params.imageid);
  await cloudinary
    .destroy(image.filename)
    .then(() => image.delete())
    .then(deletedImage => res.json({ message: 'Image deleted', deletedImage }))
    .catch(err => next(err));
};
