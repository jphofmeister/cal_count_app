import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addIngredient } from '../../actions/ingredientActions';

import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

class CreateIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      calories: 0,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const ingredientData = {
      name: this.state.name,
      calories: this.state.calories
    }

    this.props.addIngredient(ingredientData, this.props.history);
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter ingredient name"
              value={this.state.name}
              onChange={this.onChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="calories">Calories</Label>
            <Input
              type="number"
              name="calories"
              placeholder="Enter calories of this ingredient"
              value={this.state.calories}
              onChange={this.onChange} />
          </FormGroup>
          <Button color="primary">Submit</Button>
        </Form>
      </Container>
    )
  }
}

CreateIngredient.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ingredient: state.ingredient,
  errors: state.errors
});

export default connect(mapStateToProps, { addIngredient })(withRouter(CreateIngredient));