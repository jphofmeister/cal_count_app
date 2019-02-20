import React, { Component } from 'react';
import FoodIngredientTable from '../common/FoodIngredientTable';
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
    this.onDeleteFoodFromDay = this.onDeleteFoodFromDay.bind(this);
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
      });
    }
  }

  handleChangeDate(e) {
    let newDate = e.target.value;
    this.props.onChange(newDate);
  }

  onDeleteFoodFromDay(id, foodCal) {
    //remove food from day in database
    let date = this.state.date;
    this.props.deleteFoodFromDay(date, id, foodCal);
  }

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