const express = require('express');
const { Author } = require('../models/author');

exports.getAuthors = async function (_, res) {
  try {
    const authors = await Author.find();
    if (!authors) {
      return res.status(404).json({ message: 'Authors not found' });
    }
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
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.json(author);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
}
