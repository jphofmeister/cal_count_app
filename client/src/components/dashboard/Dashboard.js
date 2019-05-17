import React from 'react';
import Week from '../week/Week';
import ManageFoodForDate from './ManageFoodForDate';
import Ingredients from '../ingredients/Ingredients';

const Dashboard = () => {
  return (
    <div className="grid-container">
      <Week />
      <main>
        <ManageFoodForDate />
        {/* <Ingredients /> */}
      </main>
    </div>
  )
}

export default Dashboard;