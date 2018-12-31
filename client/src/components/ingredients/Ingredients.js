import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIngredients, deleteIngredient } from '../../actions/ingredientActions';

//import IngredientList from './IngredientList';
import TableItem from '../common/TableItem';
import Spinner from '../common/Spinner';
import { Button, Col, Table } from 'reactstrap';

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.getIngredients();
  }

  onDeleteClick(id) {
    this.props.deleteIngredient(id);
  }

  render() {
    const { ingredients, loading } = this.props.ingredient;

    let ingredientContent;

    if (ingredients === null || loading) {
      ingredientContent = <Spinner />
    } else {
      ingredientContent = <Table>
        <tbody>
          <TableItem items={ingredients} onDeleteClick={this.onDeleteClick} />
        </tbody>
      </Table>
    }

    return (
      <Col xs="3">
        <h3>Ingredients</h3>
        <Button tag={Link} to="/create-ingredient" color="primary">+ Create Ingredient</Button>
        {ingredientContent}
      </Col>
    )
  }
}

Ingredients.propTypes = {
  getIngredients: PropTypes.func.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ingredient: state.ingredient
});

export default connect(mapStateToProps, { getIngredients, deleteIngredient })(Ingredients);