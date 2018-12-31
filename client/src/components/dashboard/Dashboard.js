import React, { Component } from 'react';

import Week from './Week';
import Today from './Today';
import Ingredients from '../ingredients/Ingredients';
import Food from '../food/Food';

import { Row } from 'reactstrap';

class Dashboard extends Component {
  render() {
    return (
      <div>
        {/* <h1 className="col">Dashboard</h1> */}
        <Week />
        <Row className="mr-0 ml-0">
          <Today />
          <Food />
          <Ingredients />
        </Row>
      </div>
    )
  }
}

export default Dashboard;