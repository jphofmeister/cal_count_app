const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  }
});

module.exports = Ingredient = mongoose.model('ingredient', IngredientSchema);