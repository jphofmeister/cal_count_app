import React, { Component } from 'react';
import { Input, Col } from 'reactstrap';

class Today extends Component {
  render() {
    return (
      <Col xs="3">
        <h3>Today</h3>
        <Input type="date" />
      </Col>
    )
  }
}

export default Today;