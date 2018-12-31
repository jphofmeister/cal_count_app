import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addFood } from '../../actions/foodActions';
import { getIngredients } from '../../actions/ingredientActions';
import Spinner from '../common/Spinner';

import { ButtonGroup, Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import TableItem from '../common/TableItem';

class CreateFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      foodType: '',
      foodIngredients: [],
      calories: '',
      errors: {},
      areIngredientsHidden: true,
      areCaloriesHidden: true
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onAddIngredient = this.onAddIngredient.bind(this);
    this.toggleFoodType = this.toggleFoodType.bind(this);
  }

  componentDidMount() {
    this.props.getIngredients();
  }

  onAddIngredient(id, e) {
    e.preventDefault();

    this.setState({
      foodIngredients: [...this.state.foodIngredients, id]
    });
  }

  // toggleOptions(e) {
  //   e.preventDefault();
  //   this.setState({
  //     areOptionsHidden: !this.state.areOptionsHidden
  //   });
  // }

  toggleFoodType(e) {
    e.preventDefault();

    if (this.state.foodType === "meal") {
      this.setState({
        areIngredientsHidden: false,
        areCaloriesHidden: false
      })
    }

    if (this.state.foodType === "snack" || this.state.foodType === "beverage") {
      this.setState({
        areIngredientsHidden: true,
        areCaloriesHidden: false
      })
    }
  }

  onChange(e) {
    const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: newValue });
  }

  onSubmit(e) {
    e.preventDefault();

    const foodData = {
      name: this.state.name,
      foodType: this.state.foodType,
      ingredients: this.state.foodIngredients,
      calories: this.state.calories
    }

    this.props.addFood(foodData, this.props.history);
  }

  onCancelClick(e) {
    e.preventDefault();

    this.setState({
      name: '',
      foodType: '',
      foodIngredients: [],
      calories: '',
      errors: {},
      areIngredientsHidden: true,
      areCaloriesHidden: true
    });

    this.props.history.push('/');
  }

  render() {
    const { ingredients, loading } = this.props.ingredient;

    // this is the list of ingredients to select from
    let ingredientList;

    if (ingredients === null || loading) {
      ingredientList = <Spinner />
    } else {
      ingredientList =
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Add</th>
                <th>Ingredient</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              <TableItem items={ingredients} onAddClick={this.onAddIngredient} />
            </tbody>
          </Table>
        </Col>
    }

    // these are the ingredients that have been added to the food
    let foodIngredientList = ingredients.map((ingredient) => {
      if (!this.state.foodIngredients.includes(ingredient._id)) return null;

      return (<tr key={ingredient._id}>
        <td>{ingredient.name}</td>
        <td>{ingredient.calories}</td>
      </tr>
      );
    });

    return (
      <Container>
        <h1>Create Food Item</h1>
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter food name"
                  value={this.state.name}
                  onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input type="radio" id="meal" name="foodType" value="Meal" onChange={this.onChange} checked={this.state.foodType === 'Meal'} />
                <Label htmlFor="meal">Meal</Label>
                <Input type="radio" id="snack" name="foodType" value="Snack" onChange={this.onChange} checked={this.state.foodType === 'Snack'} />
                <Label htmlFor="snack">Snack</Label>
                <Input type="radio" id="beverage" name="foodType" value="Beverage" onChange={this.onChange} checked={this.state.foodType === 'Beverage'} />
                <Label htmlFor="beverage">Beverage</Label>
              </FormGroup>

              {!this.state.areIngredientsHidden &&
                <FormGroup>
                  <p>Added Ingredients:</p>
                  <Table>
                    <thead style={{ display: 'none' }}>
                      <tr>
                        <th>Ingredient Name</th>
                        <th>Calories</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodIngredientList}
                    </tbody>
                  </Table>
                </FormGroup>
              }

              {!this.state.areCaloriesHidden &&
                <FormGroup>
                  <Label>Calories</Label>
                  <Input
                    type="text"
                    name="calories"
                    placeholder="Enter total calories for this food"
                    value={this.state.calories}
                    onChange={this.onChange} />
                </FormGroup>
              }

            </Col>
            {ingredientList}
          </Row>
          <Button type="submit" color="primary">Submit</Button>
          <Button onClick={this.onCancelClick}>Cancel</Button>
        </Form>
      </Container >
    )
  }
}

CreateFood.propTypes = {
  addFood: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
  ingredient: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  food: state.food,
  ingredient: state.ingredient,
  errors: state.errors
});

export default connect(mapStateToProps, { addFood, getIngredients })(withRouter(CreateFood));