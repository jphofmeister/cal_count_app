import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

class IngredientList extends Component {
  render() {
    const { ingredients } = this.props;

    return (
      <Table>
        <tbody>
          {
            ingredients.map(ingredient =>
              <tr key={ingredient._id}>
                <td>{ingredient.name}</td>
                <td>{ingredient.calories}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired
}

export default IngredientList;