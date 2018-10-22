import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Dashboard from '../components/containers/Dashboard';

const Routes = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/reviews/:placeId" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Routes;
