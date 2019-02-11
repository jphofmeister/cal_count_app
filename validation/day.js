const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function valDayInput(data) {
  let errors = {};

  data.date = !isEmpty(data.date) ? data.date : '';
  // data.foodEaten = !isEmpty(data.foodEaten) ? data.foodEaten : '';
  // data.calories = !isEmpty(data.calories) ? data.calories : '';

  if (Validator.isEmpty(data.date)) {
    errors.date = 'Date is required.';
  }

  // if (Validator.isEmpty(data.foodEaten)) {
  //   errors.foodEaten = 'Food is required.';
  // }

  // if (Validator.isEmpty(data.calories)) {
  //   errors.calories = 'Calories is required.';
  // }

  // if (!Validator.isNumeric(data.calories)) {
  //   errors.calories = 'Calories must be a number.';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}