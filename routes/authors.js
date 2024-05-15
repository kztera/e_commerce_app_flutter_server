const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');

router.get('/', authorsController.getAuthors);
router.get('/:id', authorsController.getAuthorById);

module.exports = router;