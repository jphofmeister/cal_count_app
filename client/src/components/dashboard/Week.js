import React, { Component } from 'react';
import styled from 'styled-components';

const WeekTable = styled.table`
  border: none;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.2);

  thead{
    tr {
      th {
        color: #746A6A;
        font-size: 14px;
        font-weight: 700;
        border: none;
        border-right: 1px solid white;
        padding: 25px 25px 1px 25px;
        position: relative;

        div {
          background-color: #dbdbdb;
          position: absolute;
          left: 100%;
          top: 35px;
          bottom: 0;
          width: 1px;
        }
      }

      th:first-child {
        padding-left: 25px;
      }

      th:last-child {
        border-right: none;
        padding-right: 25px;
      }
    }
  }

  tbody {
    tr {
      td {
        border: none;
        border-right: 1px solid white;
        padding: 1px 25px 25px 25px;
        font-size: 20px;
        position: relative;

        div {
          background-color: #dbdbdb;
          position: absolute;
          left: 100%;
          top: 0;
          bottom: 35px;
          width: 1px;
        }
      }

      td:first-child {
        padding-left: 25px;
      }

      td:last-child {
        border-right: none;
        padding-right: 25px;
      }
    }
  }
`;


class Week extends Component {
  render() {
    return (
      <div className="week">
        <h2>This Week</h2>
        <WeekTable>
          <thead>
            <tr>
              <th>SUN<div></div></th>
              <th>MON<div></div></th>
              <th>TUE<div></div></th>
              <th>WED<div></div></th>
              <th>THU<div></div></th>
              <th>FRI<div></div></th>
              <th>SAT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2000<div></div></td>
              <td>2000<div></div></td>
              <td>2000<div></div></td>
              <td>2000<div></div></td>
              <td>2000<div></div></td>
              <td>2000<div></div></td>
              <td>2000</td>
            </tr>
          </tbody>
        </WeekTable>
      </div>
    )
  }
}

export default Week;