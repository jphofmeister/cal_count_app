import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFoods, deleteFood } from '../../actions/foodActions';

import FoodList from './FoodList';
import Spinner from '../common/Spinner';
import { Button, Col } from 'reactstrap';

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

    let foodContent;

    if (foods === null || loading) {
      foodContent = <Spinner />
    } else {
      foodContent = <FoodList foods={foods} onDeleteClick={this.onDeleteClick} />
    }

    return (
      <Col xs="6">
        <h3>Food</h3>
        <Button onClick={() => { this.props.history.replace('/create-food') }}>
          + Create Food
        </Button>
        {foodContent}
      </Col>
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