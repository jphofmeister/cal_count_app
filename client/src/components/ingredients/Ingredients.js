import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getIngredients } from '../../actions/ingredientActions';

import IngredientList from './IngredientList';
import Spinner from '../common/Spinner';
import { Button, Col } from 'reactstrap';

class Ingredients extends Component {
  componentDidMount() {
    this.props.getIngredients();
  }

  render() {
    const { ingredients, loading } = this.props.ingredient;

    let ingredientContent;

    if (ingredients === null || loading) {
      ingredientContent = <Spinner />
    } else {
      ingredientContent = <IngredientList ingredients={ingredients} />
    }

    return (
      <Col xs="3">
        <h3>Ingredients</h3>
        <Button onClick={() => { this.props.history.replace('/create-ingredient') }}>+ Create Ingredient</Button>
        {ingredientContent}
      </Col>
    )
  }
}

Ingredients.propTypes = {
  getIngredients: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ingredient: state.ingredient
});

export default connect(mapStateToProps, { getIngredients })(Ingredients);