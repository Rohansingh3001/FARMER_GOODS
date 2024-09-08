// routes/items.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// POST route for adding an item
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file.path;

    const newItem = new Item({ name, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route for retrieving all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
