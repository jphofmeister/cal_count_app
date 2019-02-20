import React, { Component } from 'react';
//import { isToday } from 'date-fns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDay, getDay, deleteFoodFromDay } from '../../actions/dayActions';
import { getFoods, deleteFood } from '../../actions/foodActions';

import Spinner from '../common/Spinner';

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
    this.onDeleteFood = this.onDeleteFood.bind(this);
    this.onAddFoodToDay = this.onAddFoodToDay.bind(this);
    this.updateDay = this.updateDay.bind(this);
  }

  componentDidMount() {
    this.props.getFoods();
    let todaysDate = new Date().toISOString().slice(0, 10)
    this.props.getDay(todaysDate);
  }

  onChangeDate(newDate) {
    this.props.getDay(newDate);
  }

  onAddFoodToDay(id, foodCal) {
    const { day } = this.props.day;

    let newCalories = day.calories + foodCal;

    this.setState({
      date: day.date,
      foodEaten: [...day.foodEaten, id],
      calories: newCalories
    }, () => this.updateDay());
  }

  updateDay() {
    const dayData = {
      date: this.state.date,
      foodEaten: this.state.foodEaten,
      calories: this.state.calories
    }

    this.props.addDay(this.state.date, dayData);
  }

  onDeleteFood(id) {
    this.props.deleteFood(id);
  }

  render() {
    const { day, loading } = this.props.day;
    const { foods } = this.props.food;

    let foodOnDateContent;

    if (loading) {
      foodOnDateContent = <Spinner />;
    } else {
      foodOnDateContent = <FoodOnDate day={day} foods={foods} onChange={this.onChangeDate} />
    }

    return (
      <div className="day-food-grid">

        {foodOnDateContent}

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