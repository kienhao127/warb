import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './layouts/Dashboard/Dashboard'
import Login from './views/Login/login'
import DriverView from './views/Driver/DriverView'
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      user: null
    }
  }

  componentDidMount(){
    if (localStorage.getItem('access_token') !== null){
      //call api get user info from token
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    if (localStorage.getItem('access_token') !== null){
      // if (this.state.isLoading){ //check is user null
      //   return (
      //     <div class="wrap" style={{backgroundColor: '#FFFFFF', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
      //       <div class="loading">
      //         <div class="bounceball"></div>
      //         <div class="text">ĐANG CHUYỂN TRANG...</div>
      //       </div>
      //     </div>
      //   );
      // } else {
        //user.Type === 4 và user.Type !=== 4

        // return (
        //   <MuiThemeProvider theme={theme}>
        //     <Switch>
        //       <Route path={"/dashboard"} component={Dashboard} />
        //       <Route path={"/driver"} component={DriverView} />
        //       <Route path={"/login"} component={Login} />
        //       <Redirect from={"/"} to={"/driver"} />
        //     </Switch>
        //   </MuiThemeProvider>
        // );
        return (
          <MuiThemeProvider theme={theme}>
            <Switch>
              <Route path={"/dashboard"} component={Dashboard} />
              <Route path={"/driver"} component={DriverView} />
              <Route path={"/login"} component={Login} />
              <Redirect from={"/"} to={"/dashboard"} />
            </Switch>
          </MuiThemeProvider>
        );
      // }
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path={"/dashboard"} component={Dashboard} />
            <Route path={"/driver"} component={DriverView} />
            <Route path={"/login"} component={Login} />
            <Redirect from={"/"} to={"/login"} />
          </Switch>
        </MuiThemeProvider>
      );
    }
    
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
