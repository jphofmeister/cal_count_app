import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Ingredient extends Component {
  render() {
    return (
      <div>
        <Button onClick={() => { this.props.history.replace('/create-ingredient') }}>+ Create Ingredient</Button>
        {/* test */}
      </div>
    )
  }
}

export default Ingredient;