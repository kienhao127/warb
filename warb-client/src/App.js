import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './layouts/Dashboard/Dashboard'
import Login from './views/Login/Login'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <Switch>
        <Route path={"/dashboard"} component={Dashboard} />
        <Route path={"/"} component={Login} />
        <Redirect from={"/"} to={"/login"} />
      </Switch>
    );
  }
}

export default App;
