const media_helper = require('../../helpers/media_helper');
const util = require('util');
const { Author } = require('../../models/author');

exports.getAuthors = async function (req, res) {
  try {
    const authors = await Author.find({ isDisabled: false })
      .populate('product');
    return res.json(authors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
}

exports.getAuthorById = async function (req, res) {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found!' });
    }
    return res.json(author);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
}

exports.addAuthor = async function (req, res) {
  try {
    const uploadImage = util.promisify(
      media_helper.upload.fields([{ name: 'image', maxCount: 1 }])
    );
    try {
      await uploadImage(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        type: error.code,
        message: `${error.message}{${err.field}}`,
        storageErrors: error.storageErrors,
      });
    }
    const image = req.files['image'][0];
    if (!image) return res.status(404).json({ message: 'No file found!' });

    req.body['image'] = `${req.protocol}://${req.get('host')}/${image.path}`;
    let author = new Author(req.body);

    author = author.save();
    if (!author) {
      return res
        .status(500)
        .json({ message: 'The author could not be created' });
    }
    return res.status(201).json(author);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.editAuthor = async function (req, res) {
  try {
    const { name, bio, products } = req.body;
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { name, bio, bio },
      { new: true }
    );
    if (!author) {
      return res.status(404).json({ message: 'Author not found!' });
    }
    return res.json(author);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.deleteAuthor = async function (req, res) {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found!' });
    }
    author.isDisabled = true;
    await author.save();
    return res.status(204).end({ message: 'Author deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.deleteAuthorImages = async function (req, res) {
  try {
    const authorId = req.params.id;
    const { deletedImagesUrls } = req.body;

    if (
      !mongoose.isValidObjectId(authorId) ||
      !Array.isArray(deletedImagesUrls)
    ) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    await media_helper.deleteImages(deletedImagesUrls);
    const author = await Author.findById(authorId);

    if (!author) return res.status(404).json({ message: 'Author not found' });

    author.images = author.images.filter(
      (image) => !deletedImagesUrls.includes(image)
    );

    await author.save();

    return res.status(204).end({ message: 'Images deleted' });
  } catch (error) {
    console.error(`Error deleting author: ${error.message}`);
    if (error.code === 'ENOENT') {
      return res.status(404).json({ message: 'Image not found' });
    }
    return res.status(500).json({ message: error.message });
  }
}

exports.deleteAllAuthors = async function (req, res) {
  try {
    const authors = await Author.find();
    if (!authors) {
      return res.status(404).json({ message: 'Authors not found' });
    }
    await Author.deleteMany();
    return res.status(204).end({ message: 'Authors deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
}
