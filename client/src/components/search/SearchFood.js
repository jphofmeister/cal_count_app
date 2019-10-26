import React, { useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import FoodIngredientTable from '../common/FoodIngredientTable';
import { Input } from 'reactstrap';

const SearchFood = ({ foods }) => {
  const [filteredFood, searchFoods] = useSearch();

  let headings = ['Foods', 'Calories'];

  return (
    <div>
      <Input type="text" className="search" onChange={e => searchFoods(foods, e.target.value)} placeholder="Search..." />
      <FoodIngredientTable items={filteredFood} headings={headings} />
    </div>
  )
}

export default SearchFood;