const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/admin/dashboard');
const usersController = require('../controllers/admin/users');
const categoriesController = require('../controllers/admin/categories');
const ordersController = require('../controllers/admin/orders');
const productsController = require('../controllers/admin/products');
const authorsController = require('../controllers/admin/authors');

// DASHBOARD
router.get('/dashboard', dashboardController.getDashboard);

// USERS
router.get('/users/:id', usersController.getUserById);
router.get('/users/count', usersController.getUserCount);
router.delete('/users/:id', usersController.deleteUser);

// CATEGORIES
router.post('/categories', categoriesController.addCategory);
router.put('/categories/:id', categoriesController.editCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);
router.delete('/allCategories', categoriesController.deleteAllCategories);

// PRODUCTS
router.get('/products/count', productsController.getProductsCount);
router.get('/products', productsController.getProducts);
router.post('/products', productsController.addProduct);
router.put('/products/:id', productsController.editProduct);
router.delete('/products/:id/images', productsController.deleteProductImages);
router.delete('/products/:id', productsController.deleteProduct);
router.delete('/allProducts', productsController.deleteAllProducts);

// ORDERS
router.get('/orders', ordersController.getOrders);
router.get('/orders/:id', ordersController.getOrderById);
router.get('/orders/count', ordersController.getOrdersCount);
router.put('/orders/:id', ordersController.changeOrderStatus);
router.delete('/orders/:id', ordersController.deleteOrder);
router.delete('/allOrders', ordersController.deleteAllOrders);

// Authors
router.get('/authors', authorsController.getAuthors);
router.get('/authors/:id', authorsController.getAuthorById);
router.post('/authors', authorsController.addAuthor);
router.put('/authors/:id', authorsController.editAuthor);
router.delete('/authors/:id', authorsController.deleteAuthor);
router.delete('/authors/:id/images', authorsController.deleteAuthorImages);
router.delete('/allAuthors', authorsController.deleteAllAuthors);

// Selects
router.get('/select/categories', categoriesController.getCategoriesSelect);
router.get('/select/authors', authorsController.getAuthorsSelect);

module.exports = router;