import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import SignUp from './SignUp';

function Routes() {
  let isAuthorized = sessionStorage.getItem('isAuthorized');
  console.log('Routes isAuthorized', isAuthorized);

  return (
    <Router>
      {!isAuthorized ? <Redirect to="/login" /> : <Redirect to="/" />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={Main} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
}

export default Routes;
