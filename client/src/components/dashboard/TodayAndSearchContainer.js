import React, { Component } from 'react';
//import { isToday } from 'date-fns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDay, getDay, deleteFoodFromDay } from '../../actions/dayActions';
import { getFoods, deleteFood } from '../../actions/foodActions';

import Spinner from '../common/Spinner';

import FoodOnDate from './FoodOnDate';
import FoodCol from '../food/FoodCol';

import SearchFood from '../search/SearchFood';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { subHours } from 'date-fns';

import food_type_meal from '../food/images/food_type_meal.png';
import food_type_snack from '../food/images/food_type_snack.png';
import food_type_beverage from '../food/images/food_type_beverage.png';

class TodayAndSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: subHours(new Date(), 4).toISOString().slice(0, 10),
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
    let todaysDate = subHours(new Date(), 4).toISOString().slice(0, 10);
    this.props.getDay(todaysDate);
  }

  onChangeDate(newDate) {
    this.props.getDay(newDate);
    this.setState({
      date: newDate
    });
  }

  onAddFoodToDay(id, foodCal) {
    const { day } = this.props.day;

    let newFoodEaten;
    let newCalories;

    if (day === null) {
      newFoodEaten = [id];
      newCalories = foodCal;
    } else {
      newFoodEaten = [...day.foodEaten, id];
      newCalories = day.calories + foodCal;
    }

    this.setState({
      //date: this.state.date,
      foodEaten: newFoodEaten,
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
      foodOnDateContent = <FoodOnDate day={day} date={this.state.date} foods={foods} onChange={this.onChangeDate} />
    }

    return (
      <main className="day-food-grid">

        {foodOnDateContent}

        <div className="food card-style">
          <div className="food-header">
            <h2>Food</h2>
            <Button tag={Link} to="/create-food" color="primary">+ Create Food</Button>
          </div>
          {/* <div className="food-tables">
            <FoodCol foods={foods} foodToFilter="Meal" image={food_type_meal} onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} />
            <FoodCol foods={foods} foodToFilter="Snack" image={food_type_snack} onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} />
            <FoodCol foods={foods} foodToFilter="Beverage" image={food_type_beverage} onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} />
          </div> */}
          <SearchFood foods={foods} />
        </div>
      </main>
    )
  }
}

TodayAndSearchContainer.propTypes = {
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

export default connect(mapStateToProps, { getFoods, deleteFood, addDay, getDay, deleteFoodFromDay })(TodayAndSearchContainer);