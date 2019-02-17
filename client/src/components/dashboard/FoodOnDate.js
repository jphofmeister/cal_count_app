import React, { Component } from 'react';
import FoodIngredientTable from '../common/FoodIngredientTable';
import Spinner from '../common/Spinner';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import { connect } from 'react-redux';
import { addDay, deleteFoodFromDay } from '../../actions/dayActions';

class FoodOnDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      foodEaten: [],
      calories: 0,
      errors: {}
    }

    this.handleChangeDate = this.handleChangeDate.bind(this);
    //this.handleDeleteFoodFromDay = this.handleDeleteFoodFromDay.bind(this);
    this.onDeleteFoodFromDay = this.onDeleteFoodFromDay.bind(this);
    this.subtractCalories = this.subtractCalories.bind(this);
    this.updateDay = this.updateDay.bind(this);
  }

  componentDidMount() {
    const { day } = this.props;
    if (day !== null) {
      let foodEatenIds = !isEmpty(day.foodEaten) ? day.foodEaten.map(food => food._id) : [];
      day.date = !isEmpty(day.date) ? day.date.slice(0, 10) : new Date().toISOString().slice(0, 10);
      day.calories = !isEmpty(day.calories) ? day.calories : 0;

      this.setState({
        date: day.date,
        foodEaten: foodEatenIds,
        calories: day.calories
      }, () => console.log(this.state));
    }
  }

  handleChangeDate(e) {
    let newDate = e.target.value;
    this.props.onChange(newDate);
  }

  onDeleteFoodFromDay(id, foodCal) {
    //remove food from day in database
    let date = this.state.date;
    this.props.deleteFoodFromDay(date, id);
    this.subtractCalories(foodCal);

    // if (this.state.foodEaten.length > 1) {
    //   //get index
    //   const removeIndex = this.state.foodEaten
    //     .map(food => food.toString())
    //     .indexOf(id);

    //   //remove food from foodEaten state
    //   this.setState((prevState) => ({
    //     foodEaten: [...prevState.foodEaten.slice(0, removeIndex), ...prevState.foodEaten.slice(removeIndex + 1)]
    //   }));

    //   this.subtractCalories(foodCal);
    // } else {
    //   this.setState({
    //     foodEaten: [],
    //     calories: 0
    //   }, () => this.updateDay())
    // }
  }

  subtractCalories(foodCal) {
    let newCalories = this.state.calories - foodCal;
    this.setState({
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

    //console.log(`this is the state after updateDay is called ${this.state}`);
  }

  // handleDeleteFoodFromDay(id, calories) {
  //   this.props.onDeleteClick(id, calories);
  // }

  render() {
    const { day, loading, foods } = this.props;
    const headings = ['Food', 'Calories', ' '];

    let foodAddedToDay = foods.map(food => {
      if (!this.state.foodEaten.includes(food._id)) return null;

      return ({
        _id: food._id,
        name: food.name,
        calories: food.calories
      });
    });

    let filteredFoodAddedToDay = foodAddedToDay.filter(Boolean);

    let dayContent;

    if (filteredFoodAddedToDay === null || filteredFoodAddedToDay === undefined || loading) {
      dayContent = "No food added today";
    } else {
      dayContent = <FoodIngredientTable items={filteredFoodAddedToDay} headings={headings} onDeleteClick={this.onDeleteFoodFromDay} />
    }

    return (
      <div className="day card-style">
        <h3>Today's Calories</h3>
        <Input
          name="date"
          type="date"
          onChange={this.handleChangeDate}
          value={this.state.date} />
        {dayContent}
        <div>
          Total Calories: {this.state.calories}
        </div>
      </div>
    )
  }
}

FoodOnDate.propTypes = {
  onDeleteFoodFromDay: PropTypes.func
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addDay, deleteFoodFromDay })(FoodOnDate);