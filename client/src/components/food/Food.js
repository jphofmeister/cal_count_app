import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FoodIngredientTable from '../common/FoodIngredientTable';
import Spinner from '../common/Spinner';

class Food extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteFood = this.handleDeleteFood.bind(this);
  }

  handleDeleteFood(id) {
    this.props.onDeleteClick(id);
  }

  render() {
    const { foods, loading } = this.props;
    const headings = ['Foods', 'Calories', ''];

    let meals = foods.filter(food => {
      return (food.foodType === "Meal")
    });

    let snacks = foods.filter(food => {
      return (food.foodType === "Snack")
    });

    let beverages = foods.filter(food => {
      return (food.foodType === "Beverage")
    });

    let mealContent;
    if (meals === null || loading) {
      mealContent = <Spinner />
    } else if (meals.length === 0) {
      mealContent = "No meals"
    } else {
      mealContent = <FoodIngredientTable items={meals} headings={headings} onDeleteClick={this.handleDeleteFood} />
    }

    let snackContent;
    if (snacks === null || loading) {
      snackContent = <Spinner />
    } else if (snacks.length === 0) {
      snackContent = "No snacks"
    } else {
      snackContent = <FoodIngredientTable items={snacks} headings={headings} onDeleteClick={this.handleDeleteFood} />
    }

    let beverageContent;
    if (beverages === null || loading) {
      beverageContent = <Spinner />
    } else if (beverages.length === 0) {
      beverageContent = "No beverages"
    } else {
      beverageContent = <FoodIngredientTable items={beverages} headings={headings} onDeleteClick={this.handleDeleteFood} />
    }

    return (
      <div className="food card-style">
        <h3>Food</h3>
        <div className="meal">
          <h4>Meals</h4>
          {mealContent}
        </div>
        <div className="snack">
          <h3>Snacks</h3>
          {snackContent}
        </div>
        <div className="beverage">
          <h3>Beverages</h3>
          {beverageContent}
        </div>
      </div>
    )
  }
}

Food.propTypes = {
  onDeleteFood: PropTypes.func
}

export default Food;