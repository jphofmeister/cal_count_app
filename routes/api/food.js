const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Food = require('../../models/Food');

//Load input validation
const valFoodInput = require('../../validation/food');

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
  const { errors, isValid } = valFoodInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newFood = {};
  if (req.body.name) newFood.name = req.body.name;
  if (req.body.foodType) newFood.foodType = req.body.foodType;
  // if (typeof req.body.ingredients != 'undefined') {
  //   newFood.ingredients = req.body.ingredients.split(',');
  // }
  if (req.body.ingredients) newFood.ingredients = req.body.ingredients;
  if (req.body.calories) newFood.calories = req.body.calories;

  new Food(newFood).save().then(food => res.json(food));
});

// @route   PUT api/food/:id
// @desc    edit food
// @access  Public
router.put('/:id', (req, res) => {
  const { errors, isValid } = valFoodInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const updatedFood = {};
  if (req.body.name) updatedFood.name = req.body.name;
  if (req.body.foodType) updatedFood.foodType = req.body.foodType;
  if (typeof req.body.ingredients != 'undefined') {
    updatedFood.ingredients = req.body.ingredients.split(',');
  }
  if (req.body.calories) updatedFood.calories = req.body.calories;

  Food.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedFood },
    { new: true }
  )
    .then(food => res.json(food))
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/food/:id
// @desc    delete food
// @access  Public
router.delete('/:id', (req, res) => {
  Food.findById(req.params.id)
    .then(food => {
      food.remove().then(() => res.json({ success: true }));
      //food.remove().then(() => res.json(food));
    })
    .catch(err => res.status(404).json({ nofood: 'No food found' }));
})

module.exports = router;