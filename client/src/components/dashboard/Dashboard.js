import React from 'react';
import Week from '../week/Week';
import TodayAndSearchContainer from './TodayAndSearchContainer';

const Dashboard = () => {
  return (
    <div className="grid-container">
      <Week />
      <TodayAndSearchContainer />
    </div>
  )
}

export default Dashboard;