import { useState, useCallback } from 'react';

export const useSearch = () => {
  const [filteredFood, setFilteredFood] = useState([]);

  const searchFoods = (foods, query) => {
    let newList = [];

    if (query !== "") {
      newList = foods.filter(food => {
        const lc = food.name.toLowerCase();
        const filter = query.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = [];
    }

    setFilteredFood(newList);
  }

  return [filteredFood, searchFoods];
}