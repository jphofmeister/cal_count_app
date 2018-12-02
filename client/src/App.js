import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Dashboard} />
          {/* <Route exact path="/create-food-item" component={CreateFoodItem} /> */}
          {/* <Route exact path="/create-ingredient" component={CreateIngredient} /> */}

        </Router>
      </Provider>
    );
  }
}

export default App;
