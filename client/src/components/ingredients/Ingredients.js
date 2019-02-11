import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIngredients, deleteIngredient } from '../../actions/ingredientActions';

import FoodIngredientTable from '../common/FoodIngredientTable';
import Spinner from '../common/Spinner';
import { Button } from 'reactstrap';
// import styled from 'styled-components';

// const ColCard = styled(Col)`
//   border-radius: 8px;
//   background-color: #fff;
// `;

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
    const headings = ['Ingredients', 'Calories', ' ']

    let ingredientContent;

    if (ingredients === null || loading) {
      ingredientContent = <Spinner />
    } else {
      ingredientContent = <FoodIngredientTable items={ingredients} headings={headings} onDeleteClick={this.onDeleteClick} />
    }

    return (
      <div className="ingredients card-style">
        <h3>Ingredients</h3>
        <Button tag={Link} to="/create-ingredient" color="primary">+ Create Ingredient</Button>
        {ingredientContent}
      </div>
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