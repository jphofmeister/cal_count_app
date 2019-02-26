import React from 'react';
import Week from './Week';
import ManageFoodForDate from './ManageFoodForDate';
import Ingredients from '../ingredients/Ingredients';

const Dashboard = () => {
  return (
    <div className="grid-container">
      <Week />
      <ManageFoodForDate />
      <Ingredients />
    </div>
  )
}

export default Dashboard;