import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Dashboard from './components/dashboard/Dashboard';
import CreateIngredient from './components/ingredients/CreateIngredient';
import CreateFood from './components/food/CreateFood';

import Header from './components/layout/Header';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Dashboard} />
            <Switch>
              <Route exact path="/create-food" component={CreateFood} />
            </Switch>
            <Switch>
              <Route exact path="/create-ingredient" component={CreateIngredient} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
