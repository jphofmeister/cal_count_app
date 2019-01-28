import React, { Component } from 'react';

import Week from './Week';
import Today from './Today';
import Ingredients from '../ingredients/Ingredients';
import Food from '../food/Food';

import { Row } from 'reactstrap';

class Dashboard extends Component {
  render() {
    return (
      <div className="grid-container">
        <Week />
        <Today />
        <Food />
        <Ingredients />
      </div>
    )
  }
}

export default Dashboard;