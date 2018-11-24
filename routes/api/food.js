const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Ingredient = require('../../models/Ingredient');
const Food = require('../../models/Food');

// @route   GET api/food
// @desc    get all food
// @access  Public
router.get('/', (req, res) => {
  Food.find()
    .then(food => res.json(food))
    .catch(err => res.status(404).json({ nofood: 'No food found' }));
});

// @route   GET api/food/:id
// @desc    get food by id
// @access  Public
router.get('/:id', (req, res) => {
  Food.findById(req.params.id)
    .populate('ingredients')
    .then(food => res.json(food))
    .catch(err => res.status(404).json({ nofood: 'No food found with that ID' }));
});

// @route   POST api/food
// @desc    create food item
// @access  Public
router.post('/', (req, res) => {
  // const {errors, isValid} = valFoodInput(req.body);

  // // check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const newFood = {};
  if (req.body.name) newFood.name = req.body.name;
  if (req.body.foodType) newFood.foodType = req.body.foodType;
  if (typeof req.body.ingredients != 'undefined') {
    newFood.ingredients = req.body.ingredients.split(',');
  }
  if (req.body.calories) newFood.calories = req.body.calories;

  new Food(newFood).save().then(food => res.json(food));
});

module.exports = router;