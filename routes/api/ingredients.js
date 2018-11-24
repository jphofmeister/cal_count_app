const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//get ingredients (get)
//get ingredient by id (get)
//create ingredient (post)
//edit ingredient (put)
//delete ingredients (delete)

const Ingredient = require('../../models/Ingredient');

// @route   GET api/ingredients
// @desc    get all ingredients
// @access  Public
router.get('/', (req, res) => {
  Ingredient.find()
    .then(ingredients => res.json(ingredients))
    .catch(err => res.status(404).json({ noingredients: 'No ingredients found.' }));
});

// @route   GET api/ingredients/:id
// @desc    get ingredients by id
// @access  Public
router.get('/:id', (req, res) => {
  Ingredient.findById(req.params.id)
    //.populate('ingredient')
    .then(ingredient => res.json(ingredient))
    .catch(err => res.status(404).json({ noingredient: 'No ingredient found with that ID.' }));
});

// @route   POST api/ingredients
// @desc    create ingredient
// @access  Public
router.post('/', (req, res) => {
  // const {errors, isValid} = valIngredientInput(req.body);

  // // check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const newIngredient = {};
  if (req.body.name) newIngredient.name = req.body.name;
  if (req.body.calories) newIngredient.calories = req.body.calories;

  // create
  new Ingredient(newIngredient).save().then(ingredient => res.json(ingredient));
});

// @route   PUT api/ingredient/:id
// @desc    edit ingredient
// @access  Public
router.put('/:id', (req, res) => {
  // const {errors, isValid} = valIngredientInput(req.body);

  // // check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const updatedIngredient = {};
  if (req.body.name) newIngredient.name = req.body.name;
  if (req.body.calories) newIngredient.calories = req.body.calories;

  Ingredient.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedIngredient },
    { new: true }
  )
    .then(ingredient => res.json(ingredient))
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/ingredient/:id
// @desc    delete ingredient
// @access  Public
router.delete('/:id', (req, res) => {
  Ingredient.findById({ ingredient: req.params.id })
    .then(ingredient => {
      ingredient.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ noingredient: 'No ingredient found' }));
});

module.exports = router;