const media_helper = require('../../helpers/media_helper');
const util = require('util');
const { Category } = require('../../models/category');

exports.addCategory = async function (req, res) {
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
    let category = new Category(req.body);

    category = category.save();
    if (!category) {
      return res
        .status(500)
        .json({ message: 'The category could not be created' });
    }
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.editCategory = async function (req, res) {
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
    if (image) {
      req.body['image'] = `${req.protocol}://${req.get('host')}/${image.path}`;
    }

    const oldCategory = await Category.findById(req.params.id);
    if (!oldCategory) {
      return res.status(404).json({ message: 'Category not found!' });
    }

    const imageUrls = [oldCategory.image]
    media_helper.deleteImages(imageUrls);

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.deleteCategory = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }
    category.isDisabled = true;
    await category.save();
    return res.status(204).end({ message: 'Category deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.deleteAllCategories = async function (req, res) {
  try {
    await Category.deleteMany({});
    return res.status(204).end({ message: 'All categories deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
}