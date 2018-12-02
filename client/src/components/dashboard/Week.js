import React, { Component } from 'react';
import { Table, Col } from 'reactstrap';

class Week extends Component {
  render() {
    return (
      <Col>
        <h2>Week</h2>
        <Table>
          <thead>
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2000 cals</td>
              <td>2000 cals</td>
              <td>2000 cals</td>
              <td>2000 cals</td>
              <td>2000 cals</td>
              <td>2000 cals</td>
              <td>2000 cals</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    )
  }
}

export default Week;