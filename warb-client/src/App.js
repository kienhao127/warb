import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './views/Dashboard/dashboard';
import Home from './views/Home/home';
import Login from './views/Login/login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  render() {
    return (
      <Switch>
        <Route path={"/dashboard"} component={Dashboard} />
        <Route path={"/login"} component={Login} />
        <Route path={"/"} component={Home} />
        <Redirect from={"/"} to={"/home"} />
      </Switch>
    );
  }
}

export default App;
