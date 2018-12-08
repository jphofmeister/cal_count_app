import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

class FoodList extends Component {
  handleDeleteClick(id) {
    this.props.onDeleteClick(id);
  }

  render() {
    const { foods } = this.props;

    return (
      <Table>
        <tbody>
          {
            foods.map(food =>
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.calories}</td>
                <td>
                  <button onClick={this.handleDeleteClick.bind(this, food._id)}>
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

FoodList.propTypes = {
  foods: PropTypes.array.isRequired
}

export default FoodList;