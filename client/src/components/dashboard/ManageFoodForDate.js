import React, { Component } from 'react';
//import { isToday } from 'date-fns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDay, getDay, deleteFoodFromDay } from '../../actions/dayActions';
import { getFoods, deleteFood } from '../../actions/foodActions';

import isEmpty from '../../validation/is-empty';

import FoodOnDate from './FoodOnDate';
import FoodCol from '../food/FoodCol';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class ManageFoodForDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      foodEaten: [],
      calories: 0
    }

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onDeleteFoodFromDay = this.onDeleteFoodFromDay.bind(this);
    this.onDeleteFood = this.onDeleteFood.bind(this);
    this.onAddFoodToDay = this.onAddFoodToDay.bind(this);
    this.updateDay = this.updateDay.bind(this);
    this.subtractCalories = this.subtractCalories.bind(this);
  }

  componentDidMount() {
    this.props.getFoods();
    this.props.getDay(this.state.date);
  }

  componentDidUpdate(prevProps, prevState) {
    const { day } = this.props.day;

    let newDate = this.state.date;

    if (day !== null) {
      if (!isEmpty(day.calories)) {
        if (prevState.calories !== day.calories) {
          let testFoodEaten = !isEmpty(day.foodEaten) ? day.foodEaten.map(food => food._id) : [];
          day.date = !isEmpty(day.date) ? day.date : newDate;
          day.calories = !isEmpty(day.calories) ? day.calories : 0;

          this.setState({
            date: day.date.slice(0, 10),
            foodEaten: testFoodEaten,
            calories: day.calories
          });
        }
      }
    } else {
      if (this.state.calories !== prevState.calories) {
        this.setState({
          foodEaten: [],
          calories: 0
        });
      }
    }
  }

  onChangeDate(newDate) {
    this.setState({ date: newDate }, () => this.props.getDay(newDate));
  }

  onAddFoodToDay(id, foodCal) {
    let newCalories = this.state.calories + foodCal;

    this.setState({
      foodEaten: [...this.state.foodEaten, id],
      calories: newCalories
    }, () => this.updateDay());
  }

  onDeleteFoodFromDay(id, foodCal) {
    //remove food from day in database
    let date = this.state.date;
    this.props.deleteFoodFromDay(date, id);

    //get index
    const removeIndex = this.state.foodEaten
      .map(food => food.toString())
      .indexOf(id);

    //remove food from foodEaten state
    this.setState((prevState) => ({
      foodEaten: [...prevState.foodEaten.slice(0, removeIndex), ...prevState.foodEaten.slice(removeIndex + 1)]
    }));

    this.subtractCalories(foodCal);
  }

  subtractCalories(foodCal) {
    let newCalories = this.state.calories - foodCal;
    this.setState({
      calories: newCalories
    }, () => this.updateDay())
  }

  updateDay() {
    const dayData = {
      date: this.state.date,
      foodEaten: this.state.foodEaten,
      calories: this.state.calories
    }

    this.props.addDay(dayData);
  }

  onDeleteFood(id) {
    this.props.deleteFood(id);
  }

  render() {
    const { day, loading } = this.props.day;
    const { foods } = this.props.food;

    let foodAddedToDay = foods.map(food => {
      if (!this.state.foodEaten.includes(food._id)) return null;

      return ({
        _id: food._id,
        name: food.name,
        calories: food.calories
      });
    });

    let filteredFoodAddedToDay = foodAddedToDay.filter(Boolean);

    return (
      <div className="day-food-grid">

        <FoodOnDate
          day={day}
          date={this.state.date}
          foodAddedToDay={filteredFoodAddedToDay}
          calories={this.state.calories}
          onChange={this.onChangeDate}
          onDeleteClick={this.onDeleteFoodFromDay} />

        <div className="food card-style">
          <h3>Food</h3>
          <Button tag={Link} to="/create-food" color="primary">+ Create Food</Button>
          <FoodCol foods={foods} foodToFilter="Meal" onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} />
          <FoodCol foods={foods} foodToFilter="Snack" onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} />
          <FoodCol foods={foods} foodToFilter="Beverage" onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} />
        </div>
      </div>
    )
  }
}

ManageFoodForDate.propTypes = {
  getFoods: PropTypes.func.isRequired,
  deleteFood: PropTypes.func.isRequired,
  addDay: PropTypes.func.isRequired,
  getDay: PropTypes.func.isRequired,
  deleteFoodFromDay: PropTypes.func,
  day: PropTypes.object,
  days: PropTypes.array
}

const mapStateToProps = state => ({
  day: state.day,
  food: state.food
})

export default connect(mapStateToProps, { getFoods, deleteFood, addDay, getDay, deleteFoodFromDay })(ManageFoodForDate);