import React from 'react';
import { useSearch } from '../../hooks/useSearch';
import FoodIngredientTable from '../common/FoodIngredientTable';

import styled from 'styled-components';

const SearchInput = styled.input`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  width: 100%;
  border-radius: 8px;
  font-size: 1.125rem;
  line-height: 1;
`;

const SearchFood = ({ foods, onAddClick, onDeleteClick }) => {
  const [filteredFood, searchFoods] = useSearch();

  let headings = ['', 'Foods', 'Calories', ''];

  let filteredFoodTable;
  if (filteredFood === null || filteredFood.length === 0) {
    filteredFoodTable = null;
  } else {
    filteredFoodTable = (
      <div className="card-style" style={{ marginTop: .5 + 'rem' }}>
        <FoodIngredientTable
          items={filteredFood}
          headings={headings}
          onAddClick={(id, calories, e) => onAddClick(id, calories, e)}
          onDeleteClick={(id) => onDeleteClick(id)} />
      </div>
    );
  }

  return (
    <div>
      <SearchInput
        type="text"
        className="search"
        onChange={e => searchFoods(foods, e.target.value)}
        placeholder="Search..." />
      {filteredFoodTable}
    </div>
  )
}

export default SearchFood;