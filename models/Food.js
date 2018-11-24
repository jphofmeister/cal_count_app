const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  ingredients: [{
    type: Schema.Types.ObjectId,
    ref: 'ingredient'
  }],
  calories: {
    type: Number,
    required: true
  }
});

module.exports = Food = mongoose.model('food', FoodSchema);