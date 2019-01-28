import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFoods, deleteFood } from '../../actions/foodActions';

import FoodIngredientTable from '../common/FoodIngredientTable';
import Spinner from '../common/Spinner';
import { Button, Col } from 'reactstrap';
// import styled from 'styled-components';

// const ColCard = styled(Col)`
//   border-radius: 8px;
//   background-color: #fff;
// `;

class Food extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.getFoods();
  }

  onDeleteClick(id) {
    this.props.deleteFood(id);
  }

  render() {
    const { foods, loading } = this.props.food;
    const headings = ['Foods', 'Calories', ''];

    let foodContent;

    if (foods === null || loading) {
      foodContent = <Spinner />
    } else {
      foodContent = <FoodIngredientTable items={foods} headings={headings} onDeleteClick={this.onDeleteClick} />
    }

    return (
      <div className="food card">
        <h3>Food</h3>
        <Button tag={Link} to="/create-food" color="primary">+ Create Food</Button>
        {foodContent}
      </div>
    )
  }
}

Food.propTypes = {
  getFoods: PropTypes.func.isRequired,
  deleteFood: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  food: state.food
});

export default connect(mapStateToProps, { getFoods, deleteFood })(Food);