import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDay, getDay, deleteFoodFromDay } from '../../actions/dayActions';
import { getFoods, deleteFood } from '../../actions/foodActions';

import Spinner from '../common/Spinner';

import FoodOnDate from './FoodOnDate';

import SearchFood from '../search/SearchFood';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { subHours } from 'date-fns';

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

        <div className="food">
          <div className="food-header">
            <h2>What have you eaten today?</h2>
            <Button tag={Link} to="/create-food" color="primary">+ Create Food</Button>
          </div>
          <p>Search for food and click on the + to add the food you’ve eaten today.</p>
          <SearchFood foods={foods} onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} />
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