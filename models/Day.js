const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  foodEaten: [{
    type: Schema.Types.ObjectId,
    ref: 'food'
  }],
  calories: {
    type: Number,
    required: true
  }
});

module.exports = Day = mongoose.model('day', DaySchema);