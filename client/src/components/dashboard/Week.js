import React, { Component } from 'react';
import { Table, Col } from 'reactstrap';
//import styled from 'styled-components';

// const ColCard = styled(Col)`
//   border-radius: 8px;
//   background-color: #fff;
// `;

class Week extends Component {
  render() {
    return (
      <div className="week card">
        <h2>This Week</h2>
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
      </div>
    )
  }
}

export default Week;