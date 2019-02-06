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

  handleDeleteFoodFromDay(id) {
    this.props.onDeleteClick(id);
  }

  render() {
    //if (this.props.day) {
    const { day, loading } = this.props;
    const { foodEaten } = day;
    const headings = ['Food', 'Calories', ' '];

    let dayContent;

    if (foodEaten === null || foodEaten === undefined || loading) {
      dayContent = <Spinner />
    } else {
      dayContent = <FoodIngredientTable items={foodEaten} headings={headings} onDeleteClick={this.handleDeleteFoodFromDay} />
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
      </div>
    )
  }
}

FoodOnDate.propTypes = {
  onDeleteFoodFromDay: PropTypes.func
}

export default FoodOnDate;