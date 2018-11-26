const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function valIngredientInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.calories = !isEmpty(data.calories) ? data.calories : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Ingredient name is required.';
  }

  if (Validator.isEmpty(data.calories)) {
    errors.calories = 'Ingredient calories is required.';
  }

  if (!Validator.isNumeric(data.calories)) {
    errors.calories = 'Calories must be a number.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}