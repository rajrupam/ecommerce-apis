const mongoose = require('mongoose');

const productCategoriesSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   id: {
      type: Number,
      required: true
   },
   imageUrl: {
      type: String,
      required: true
   }
});

const ProductCategories = mongoose.model('ProductCategories', productCategoriesSchema);

module.exports = ProductCategories;
