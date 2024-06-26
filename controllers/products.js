const { Product } = require('../models/product');

exports.getProducts = async function (req, res) {
  try {
    let products;
    const page = req.query.page || 1;
    const pageSize = 10;
    let query = {};

    if (req.query.criteria) {
      if (req.query.category) {
        query['categories'] = { $in: req.query.category };
      }
      switch (req.query.criteria) {
        case 'newArrivals': {
          const twoWeeksAgo = new Date();
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
          query['dateAdded'] = { $gte: twoWeeksAgo };
          break;
        }
        case 'popular':
          query['rating'] = { $gte: 4.5 };
          break;
        case 'mostDownloaded':
          query['numOfDownloads'] = { $gte: 100 };
          break;
        default:
          break;
      }
    } else if (req.query.category) {
      query['categories'] = { $in: req.query.category };
    }

    products = await Product.find(query)
      .select('-images -reviews -source')
      .skip((page - 1) * pageSize)
      .sort({ dateAdded: -1 })
      .limit(pageSize)
      .populate('author')
      .populate('category');

    // xáo trộn các kết quả products
    products = products.sort(() => Math.random() - 0.5);

    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
exports.searchProducts = async function (req, res) {
  try {
    const searchTerm = req.query.q;

    const page = req.query.page || 1;
    const pageSize = 10;

    let query = {};
    if (req.query.category) {
      query = { category: req.query.category };
    }

    if (searchTerm) {
      query = {
        ...query,
        $text: {
          $search: searchTerm,
          $language: 'vietnamese',
          $caseSensitive: false
        },
      };
    }
    const searchResults = await Product.find(query)
      .populate('author', 'category')
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.json(searchResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
exports.getProductById = async function (req, res) {
  try {
    const product = await Product.findById(req.params.id)
      .populate('author')
      .populate('category');

    // product.rating = product.rating.$numberDecimal;

    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
// router.get('/authors/:id', productsController.getProductsByAuthorId);
exports.getProductsByAuthorId = async function (req, res) {
  console.log("req:", req.params);
  try {
    const page = req.query.page || 1;
    const pageSize = 10;

    

    const products = await Product.find({ authors: req.params.id })
      .populate('author')
      .populate('category')
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!products) {
      return res.status(404).json({ message: 'Products not found!' });
    }
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};