import React, { Component } from 'react';
import FoodIngredientTable from '../common/FoodIngredientTable';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import { connect } from 'react-redux';
import { addDay, deleteFoodFromDay } from '../../actions/dayActions';

import styled from 'styled-components';
import { getFood } from '../../actions/foodActions';

const TotalCalories = styled.span`
  color: #5F51E4;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
`;

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
    this.onDeleteFoodFromDay = this.onDeleteFoodFromDay.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
  }

  componentDidMount() {
    const { day } = this.props;

    // if props.day doesn't equal null, set the state equal to it
    if (day !== null) {
      day.foodEaten = !isEmpty(day.foodEaten) ? day.foodEaten : [];
      day.date = !isEmpty(day.date) ? day.date.slice(0, 10) : new Date().toISOString().slice(0, 10);
      day.calories = !isEmpty(day.calories) ? day.calories : 0

      this.setState({
        date: this.props.date,
        foodEaten: day.foodEaten,
        calories: day.calories
      });
    }
  }

  handleChangeDate(e) {
    //pass the selected date to the parent component
    let newDate = e.target.value;
    this.props.onChange(newDate);
  }

  onDeleteFoodFromDay(id, foodCal) {
    //remove food from day in database
    let date = this.state.date;
    this.props.deleteFoodFromDay(date, id, foodCal);
  }

  removeDuplicates(foodArr, id) {
    return foodArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[id]).indexOf(obj[id]) === pos;
    });
  }

  render() {
    const { day, loading, foods } = this.props;
    const headings = ['Food', 'Qty', 'Cal', ' '];

    let foodAddedToDay = this.state.foodEaten.map(food => {

      //count each time a food is listed in foodEaten
      let counts = 0;
      this.state.foodEaten.forEach(foodOfToday => {
        if (foodOfToday._id === food._id) {
          counts++;
        }
      });

      return ({
        _id: food._id,
        name: food.name,
        calories: food.calories,
        quantity: counts
      });
    });

    //remove duplicates from array
    let uniqueFoodFromDay = this.removeDuplicates(foodAddedToDay, '_id');

    //check if any food is added to today before setting the FoodIngredientTable
    let dayContent;

    if (uniqueFoodFromDay === null || uniqueFoodFromDay === undefined || loading) {
      dayContent = "No food added today";
    } else {
      dayContent = <FoodIngredientTable items={uniqueFoodFromDay} headings={headings} onDeleteClick={this.onDeleteFoodFromDay} />
    }

    return (
      <div className="day card-style">
        <h2>Today's Calories</h2>
        <Input
          name="date"
          type="date"
          onChange={this.handleChangeDate}
          value={this.props.date} />
        {dayContent}
        <div>
          Total: <TotalCalories>{this.state.calories} calories</TotalCalories>
        </div>
      </div>
    )
  }
}

FoodOnDate.propTypes = {
  onDeleteFoodFromDay: PropTypes.func,
  getFood: PropTypes.func
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addDay, deleteFoodFromDay, getFood })(FoodOnDate);