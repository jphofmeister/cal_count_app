import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addFood } from '../../actions/foodActions';
import { getIngredients } from '../../actions/ingredientActions';
import Spinner from '../common/Spinner';

import { Button, Form, FormGroup, Container, Row, Col, Table } from 'reactstrap';
import TextInput from '../common/TextInput';
import RadioButtons from '../common/RadioButtons';
import FoodIngredientTable from '../common/FoodIngredientTable';

import food_type_meal from './images/food_type_meal.png';
import food_type_snack from './images/food_type_snack.png';
import food_type_beverage from './images/food_type_beverage.png';

class CreateFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      foodType: '',
      foodIngredients: [],
      calories: 0,
      errors: {},
      areIngredientsHidden: true,
      areCaloriesHidden: true,
      areCaloriesReadOnly: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onAddIngredient = this.onAddIngredient.bind(this);
    this.onMealClick = this.onMealClick.bind(this);
    this.onSnackBevClick = this.onSnackBevClick.bind(this);
  }

  componentDidMount() {
    this.props.getIngredients();
  }

  onAddIngredient(id, ingCalories, e) {
    e.preventDefault();

    let newCalories = this.state.calories + ingCalories;

    this.setState({
      foodIngredients: [...this.state.foodIngredients, id],
      calories: newCalories
    });
  }

  onMealClick() {
    this.setState({
      areIngredientsHidden: false,
      areCaloriesHidden: false,
      //areCaloriesReadOnly: true
    })
  }

  onSnackBevClick() {
    this.setState({
      areIngredientsHidden: true,
      areCaloriesHidden: false,
      //areCaloriesReadOnly: false
    })
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
      calories: 0,
      errors: {},
      areIngredientsHidden: true,
      areCaloriesHidden: true,
      //areCaloriesReadOnly: false
    });

    this.props.history.push('/');
  }

  render() {
    const { errors } = this.state;
    const { ingredients, loading } = this.props.ingredient;
    const headings = ['Add', 'Ingredient', 'Calories'];

    // this is the list of ingredients to select from
    let ingredientList;

    if (this.state.areIngredientsHidden === false) {
      if (ingredients === null || loading) {
        ingredientList = <Spinner />
      } else {
        ingredientList = <FoodIngredientTable items={ingredients} headings={headings} onAddClick={this.onAddIngredient} />
      }
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

    const radioOptions = [
      { name: 'foodType', image: food_type_meal, value: 'Meal', checked: this.state.foodType === 'Meal', onChange: this.onChange, onClick: this.onMealClick },
      { name: 'foodType', image: food_type_snack, value: 'Snack', checked: this.state.foodType === 'Snack', onChange: this.onChange, onClick: this.onSnackBevClick },
      { name: 'foodType', image: food_type_beverage, value: 'Beverage', checked: this.state.foodType === 'Beverage', onChange: this.onChange, onClick: this.onSnackBevClick }
    ];

    return (
      <Container>
        <h1>Create Food Item</h1>
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col>
              <TextInput name="name" labelText="Name" placeholder="Enter food name" value={this.state.name} onChange={this.onChange} error={errors.name} />

              <RadioButtons legend="Food Type" options={radioOptions} error={errors.foodType} />

              {/* if ingredients are not hidden, then show */}
              {!this.state.areIngredientsHidden ?
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
                : null
              }

              {/* if calories are not hidden, then show */}
              {!this.state.areCaloriesHidden ?
                <TextInput type="number" name="calories" labelText="Calories" placeholder="Enter total calories for this food" value={this.state.calories} onChange={this.onChange} readOnly={this.state.areCaloriesReadOnly} error={errors.name} />
                : null
              }
            </Col>

            {/* below is the list of ingredients you pick from */}
            <Col>{ingredientList}</Col>
          </Row>
          <Button type="submit" color="primary">Submit</Button>
          <Button onClick={this.onCancelClick}>Cancel</Button>
        </Form >
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