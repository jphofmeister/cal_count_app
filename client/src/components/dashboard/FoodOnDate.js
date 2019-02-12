import React, { Component } from 'react';
import FoodIngredientTable from '../common/FoodIngredientTable';
import Spinner from '../common/Spinner';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

class FoodOnDate extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleDeleteFoodFromDay = this.handleDeleteFoodFromDay.bind(this);
  }

  handleChangeDate(e) {
    this.props.onChange(e.target.value);
  }

  handleDeleteFoodFromDay(id, calories) {
    this.props.onDeleteClick(id, calories);
  }

  render() {
    //if (this.props.day) {
    const { day, loading } = this.props;
    const { foodAddedToDay } = this.props;
    const headings = ['Food', 'Calories', ' '];

    let dayContent;

    if (foodAddedToDay === null || foodAddedToDay === undefined || loading) {
      dayContent = "No food added today"
    } else {
      dayContent = <FoodIngredientTable items={foodAddedToDay} headings={headings} onDeleteClick={this.handleDeleteFoodFromDay} />
    }

    return (
      <div className="day card-style">
        <h3>Today's Calories</h3>
        <Input
          name="date"
          type="date"
          onChange={this.handleChangeDate}
          value={this.props.date} />
        {dayContent}
        <div>
          Total Calories: {this.props.calories}
        </div>
      </div>
    )
  }
}

FoodOnDate.propTypes = {
  onDeleteFoodFromDay: PropTypes.func
}

export default FoodOnDate;