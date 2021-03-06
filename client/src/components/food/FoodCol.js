import React from 'react';
import PropTypes from 'prop-types';

import FoodIngredientTable from '../common/FoodIngredientTable';
import Spinner from '../common/Spinner';

const FoodCol = ({ foods, loading, foodToFilter, onAddClick, onDeleteClick, image }) => {

  let headings = [' ', 'Foods', 'Calories', ''];

  let filteredFood = foods.filter(food => {
    return (food.foodType === foodToFilter)
  });

  let filteredFoodContent;

  if (filteredFood === null || loading) {
    filteredFoodContent = <Spinner />
  } else if (filteredFood.length === 0) {
    filteredFoodContent = `No ${foodToFilter}s`
  } else {
    filteredFoodContent = <FoodIngredientTable
      items={filteredFood}
      headings={headings}
      onAddClick={(id, calories, e) => onAddClick(id, calories, e)}
      onDeleteClick={(id) => onDeleteClick(id)} />
  }

  return (
    <div className={foodToFilter.toLowerCase()}>
      <h3><img key={image} src={image} width="35" height="35" alt="" /> {foodToFilter}s</h3>
      {filteredFoodContent}
    </div>
  )
}

FoodCol.propTypes = {
  //onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func
}

export default FoodCol;