// models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Item', ItemSchema);
