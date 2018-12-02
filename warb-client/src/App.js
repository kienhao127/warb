import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './layouts/Dashboard/Dashboard'
import Login from './views/Login/Login'
import DriverView from './views/Driver/DriverView'
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route path={"/dashboard"} component={Dashboard} />
          <Route path={"/driver"} component={DriverView} />
          <Route path={"/"} component={Login} />
          <Redirect from={"/"} to={"/login"} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#00bcd4',
    },
  },
});

export default App;
