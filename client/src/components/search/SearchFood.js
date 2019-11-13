import React from 'react';
import { useSearch } from '../../hooks/useSearch';
import FoodIngredientTable from '../common/FoodIngredientTable';
import { Input } from 'reactstrap';

const SearchFood = ({ foods, onAddClick, onDeleteClick }) => {
  const [filteredFood, searchFoods] = useSearch();

  let headings = ['', 'Foods', 'Calories', ''];

  return (
    <div>
      <Input
        type="text"
        className="search"
        onChange={e => searchFoods(foods, e.target.value)}
        placeholder="Search..." />
      <FoodIngredientTable
        items={filteredFood}
        headings={headings}
        onAddClick={(id, calories, e) => onAddClick(id, calories, e)}
        onDeleteClick={(id) => onDeleteClick(id)} />
    </div>
  )
}

export default SearchFood;