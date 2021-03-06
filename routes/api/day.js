const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Day = require('../../models/Day');

const valDayInput = require('../../validation/day');

// @route   GET api/day
// @desc    get all days
// @access  Public
router.get('/', (req, res) => {
  let weekArray;
  if (typeof req.query.week != 'undefined') {
    weekArray = req.query.week.split(',');
  }

  Day.find({ 'date': { $in: weekArray } })
    .select('date calories')
    .sort('date')
    .then(days => res.json(days))

    .catch(err => res.status(404).json({ noday: 'No record found on this date.' }));
});

// @route   GET api/day/day
// @desc    get food record for a single day
// @access  Public
router.get('/date', (req, res) => {
  Day.findOne({ date: req.query.date })
    .populate({
      path: 'foodEaten',
      populate: { path: 'food' } //was ingredients before, but why?
    })
    .then(day => res.json(day))
    .catch(err => res.status(404).json({ noday: 'No record found on this date.' }));
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

  const dayData = {};
  if (req.body.date) dayData.date = req.body.date;
  if (req.body.foodEaten) dayData.foodEaten = req.body.foodEaten;
  if (req.body.calories) dayData.calories = req.body.calories;

  Day.findOne({ date: req.body.date })
    .then(day => {
      if (day) {
        // if day exists, update
        Day.findOneAndUpdate(
          { date: req.body.date },
          { $set: dayData },
          { new: true }
        ).then(day => res.json(day))
      } else {
        //doesn't exist, create
        new Day(dayData).save().then(day => res.json(day));
      }
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/day/date
// @desc    remove food record of a single day
// @access  Public
router.delete('/date', (req, res) => {
  Day.findOne({ date: req.query.date })
    .then(day => {
      day.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ noday: 'No record found on this date.' }))
});

// @route   DELETE api/day/date/food
// @desc    remove single food item from a day
// @access  Public
router.delete('/date/food', (req, res) => {
  Day.findOne({ date: req.query.date })
    .then(day => {
      if (day.foodEaten.filter(food => food._id.toString() === req.query.food_id).length === 0) {
        return res.status(404).json({ foodnotfound: 'Food not found' })
      }

      //get remove index
      const removeIndex = day.foodEaten
        .map(food => food._id.toString())
        .indexOf(req.query.food_id);

      //splice food out of array
      day.foodEaten.splice(removeIndex, 1);

      //get new calorie count
      day.calories -= req.query.calories;

      //save
      day.save().then(day => res.json(day));

    })
    .catch(err => res.status(404).json({ noday: 'No record found on this date.' }))
});

module.exports = router;