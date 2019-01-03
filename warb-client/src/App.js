import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Dashboard from './layouts/Dashboard/Dashboard'
import Login from './views/Login/login'
import DriverView from './views/Driver/DriverView'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import './App.css';
import { getUserByToken } from './store/actions/user';
import { connect } from "react-redux";
import Loading from './components/Loading/Loading';
import {socket} from './Utils/FunctionHelper';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    socket.on('token', data => {
      console.log('new access token', data);
      sessionStorage.setItem('access_token', data);
    });
    socket.on('done_update', data => {
      if (data){
        if (sessionStorage.getItem('access_token') !== null) {
          this.props.doGetUserByToken()
          .then(resJson => {
            console.log("doGetUserByToken", resJson);
            if (resJson !== undefined){
              var user = resJson.user;
              this.setState({
                user: user,
              })
            }
          })
        }
      }
    })
  }

  componentDidMount() {
    console.log('user', this.state.user);
    //gửi refresh token lên server để nhận biết user
    if (sessionStorage.getItem('refresh_token') !== null) {
      socket.emit('send_refresh_token', sessionStorage.getItem('refresh_token'));
    }
    if (sessionStorage.getItem('access_token') !== null) {
      this.props.doGetUserByToken()
      .then(resJson => {
        console.log("doGetUserByToken", resJson);
        if (resJson !== undefined){
          var user = resJson.user;
          this.setState({
            user: user,
          })
        }
      })
    }
  }

  render() {
    if (sessionStorage.getItem('access_token') !== null && this.state.user !== null) {
      if (this.state.user === null) {
        return (
          <Loading backgroundColor="#FFFFFF" loadingText={"ĐANG CHUYỂN TRANG..."}/>
        );
      } else {
        if (this.state.user.userType === 4)
          return (
            <MuiThemeProvider theme={theme}>
              <Switch>
                <Route path={"/driver"} component={DriverView} />
                <Redirect from={"/"} to={"/driver"} />
              </Switch>
            </MuiThemeProvider>
          );
        else {
          return (
            <MuiThemeProvider theme={theme}>
              <Switch>
                <Route path={"/dashboard"} component={Dashboard} />
                <Redirect from={"/"} to={"/dashboard"} />
              </Switch>
            </MuiThemeProvider>
          );
        }
      }
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path={"/dashboard"} component={Dashboard} />
            <Route path={"/driver"} component={DriverView} />
            <Route exact path={"/"} component={Login} />
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

const mapStateToProps = state => {
  return {
    userProfile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetUserByToken: () => dispatch(getUserByToken()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
