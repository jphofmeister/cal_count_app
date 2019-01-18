const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Day = require('../../models/Day');

const valDayInput = require('../../validation/day');

// @route   GET api/day
// @desc    get all days
// @access  Public
// @TODO    Might have to add some filters to only get a week or month
router.get('/', (req, res) => {
  Day.find()
    .then(days => res.json(days))
    .catch(err => res.status(404).json({ nodays: 'No records found for any days.' }));
});

// @route   GET api/day/:id 
// @desc    get food record for a single day
// @access  Public
router.get('/:date', (req, res) => {
  // Day.findById(req.params.id)
  Day.findOne({ date: req.body.date })
    .populate({
      path: 'foodEaten',
      populate: { path: 'food' } //was ingredients before, but why?
    })
    .then(day => res.json(day))
    .catch(err => res.status(404).json({ noday: 'No record found on this date.' }))
});

// @route   POST api/day
// @desc    add food record to a single day
// @access  Public
router.post('/', (req, res) => {
  const { errors, isValid } = valDayInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newDay = {};
  if (req.body.date) newDay.date = req.body.date;
  if (typeof req.body.foodEaten != 'undefined') {
    newDay.foodEaten = req.body.foodEaten.split(',');
  }
  if (req.body.calories) newDay.calories = req.body.calories;

  new Day(newDay).save().then(day => res.json(day));
});

// @route   PUT api/day/:id
// @desc    edit food record of a single day
// @access  Public
router.put('/:id', (req, res) => {
  const { errors, isValid } = valDayInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const updatedDay = {};
  if (req.body.date) updatedDay.date = req.body.date;
  if (typeof req.body.foodEaten != 'undefined') {
    updatedDay.foodEaten = req.body.foodEaten.split(',');
  }
  if (req.body.calories) updatedDay.calories = req.body.calories;

  Day.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedDay },
    { new: true }
  )
    .then(day => res.json(day))
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/day/:id
// @desc    remove food record of a single day
// @access  Public
router.delete('/:id', (req, res) => {
  Day.findById(req.params.id)
    .then(day => {
      day.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ noday: 'No record found on this date.' }))
});

module.exports = router;