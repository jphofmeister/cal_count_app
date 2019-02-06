import React, { Component } from 'react';
import { Input, Col } from 'reactstrap';
//import { isToday } from 'date-fns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDay, getDay, deleteFoodFromDay } from '../../actions/dayActions';
import { getFoods, deleteFood } from '../../actions/foodActions';

import isEmpty from '../../validation/is-empty';

import FoodOnDate from './FoodOnDate';
import Food from '../food/Food';
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
  }

  componentDidMount() {
    this.props.getFoods();

    let newDate = this.state.date;
    this.props.getDay(newDate);

    // const { day } = this.props.day;
    // const { foodEaten } = this.props.day.day;

    // const testFoodEaten = foodEaten.join(',');

    // day.date = !isEmpty(day.date) ? day.date : newDate;
    // day.calories = !isEmpty(day.calories) ? day.calories : 0;

    // this.setState({
    //   date: day.date,
    //   foodEaten: testFoodEaten,
    //   calories: day.calories
    // });
  }

  onChangeDate(newDate) {
    this.setState({ date: newDate }, this.props.getDay(newDate));
  }

  onAddFoodToDay(id, foodCal, e) {
    //e.preventDefault();

    let newCalories = this.state.calories + foodCal;

    this.setState({
      foodEaten: [...this.state.foodEaten, id],
      calories: newCalories
    });

    this.updateDay();
  }

  updateDay() {
    const dayData = {
      date: this.state.day,
      foodEaten: this.state.foodEaten,
      calories: this.state.calories
    }

    this.props.addDay(dayData);

    console.log(this.state.foodEaten);
  }

  onDeleteFoodFromDay(id) {
    let date = this.state.date;
    this.props.deleteFoodFromDay(date, id);
  }

  onDeleteFood(id) {
    this.props.deleteFood(id);
  }

  render() {
    const { day } = this.props.day;
    const { foods } = this.props.food;

    return (
      <div className="day-food-grid">
        <FoodOnDate day={day} date={this.state.date} onChange={this.onChangeDate} onDeleteClick={this.onDeleteFoodFromDay} />
        {/* <Food foods={foods} onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} /> */}
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