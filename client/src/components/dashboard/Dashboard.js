import React, { Component } from 'react';

import Week from './Week';
import ManageFoodForDate from './ManageFoodForDate';
import Ingredients from '../ingredients/Ingredients';


class Dashboard extends Component {
  render() {
    return (
      <div className="grid-container">
        <Week />
        <ManageFoodForDate />
        <Ingredients />
      </div>
    )
  }
}

export default Dashboard;