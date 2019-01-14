const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function valFoodInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.foodType = !isEmpty(data.foodType) ? data.foodType : '';
  //data.calories = !isEmpty(data.calories) ? data.calories : 0;

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Food name is required.';
  }

  if (Validator.isEmpty(data.foodType)) {
    errors.foodType = 'Food type is required.';
  }

  // if (Validator.isEmpty(data.calories)) {
  //   errors.calories = 'Food calories is required.';
  // }

  // if (!Validator.isNumeric(data.calories)) {
  //   errors.calories = 'Calories must be a number.';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}