import React, { Component } from 'react';

import Week from './Week';
import Today from './Today';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="col">Dashboard</h1>
        <Week />
        <Today />
      </div>
    )
  }
}

export default Dashboard;