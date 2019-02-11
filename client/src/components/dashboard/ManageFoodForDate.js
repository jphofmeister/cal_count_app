import React, { Component } from 'react';
//import { isToday } from 'date-fns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDay, getDay, deleteFoodFromDay } from '../../actions/dayActions';
import { getFoods, deleteFood } from '../../actions/foodActions';

import isEmpty from '../../validation/is-empty';

//import FoodOnDate from './FoodOnDate';
import FoodCol from '../food/FoodCol';
//import Spinner from '../common/Spinner';

import { Link } from 'react-router-dom';
import { Input, Button, Table } from 'reactstrap';
//import FoodIngredientTable from '../common/FoodIngredientTable';

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
    this.props.getDay(this.state.date);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.foodEaten);
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

  onChangeDate(e) {
    this.setState({ date: e.target.value }, this.props.getDay(e.target.value));
  }

  onAddFoodToDay(id, foodCal) {
    let newCalories = this.state.calories + foodCal;

    this.setState({
      foodEaten: [...this.state.foodEaten, id],
      calories: newCalories
    }, () => this.updateDay());
  }

  updateDay() {
    const dayData = {
      date: this.state.date,
      foodEaten: this.state.foodEaten,
      calories: this.state.calories
    }

    this.props.addDay(dayData);
  }

  onDeleteFoodFromDay(id) {
    let date = this.state.date;
    this.props.deleteFoodFromDay(date, id);
  }

  onDeleteFood(id) {
    this.props.deleteFood(id);
  }

  render() {
    //const { day, loading } = this.props.day;
    const { foods } = this.props.food;

    let foodAddedToDay = foods.map(food => {
      if (!this.state.foodEaten.includes(food._id)) return null;

      return (
        <tr key={food._id}>
          <td>{food.name}</td>
          <td>{food.calories}</td>
        </tr>
      );
    });

    return (
      <div className="day-food-grid">
        {/* <FoodOnDate day={day} date={this.state.date} onChange={this.onChangeDate} onDeleteClick={this.onDeleteFoodFromDay} /> */}
        {/* <FoodOnDate day={day} foodEaten={this.state.foodEaten} date={this.state.date} onChange={this.onChangeDate} onDeleteClick={this.onDeleteFoodFromDay} /> */}
        {/* <Food foods={foods} onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} /> */}
        {/* {foodAddedToDayContent} */}
        <div className="day card-style">
          <h3>Today's Calories</h3>
          <Input
            name="date"
            type="date"
            onChange={this.onChangeDate}
            value={this.state.date} />
          <Table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {foodAddedToDay}
            </tbody>
          </Table>
          Total Calories: {this.state.calories}
        </div>
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