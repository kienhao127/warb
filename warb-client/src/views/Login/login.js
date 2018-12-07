import React from "react";
import './Login.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { login, getUserInfo } from "../../store/actions/user";
import { Typography } from "@material-ui/core";
import Loading from "components/Loading/Loading";
import io from 'socket.io-client';
const socket = io('http://localhost:8888')

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',

      loginError: '',
      userType: -1,

      isLoading: false,
    };
  }
  

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onLogin = (username, password) => {
    this.setState({
      isLoading: !this.state.isLoading,
    })
    this.props.doLogin(username, password)
    .then(resJson => {
      this.setState({
        isLoading: !this.state.isLoading,
      })
      if (resJson.returnCode === 1){
        //dispatch userProfile to reducer
        this.props.doGetUserInfo(resJson.user.userId);

        //gửi refresh token lên server để server biết user nào đang online
        socket.emit('send_refresh_token', resJson.user.refresh_token);
        this.setState({
          loginError: '',
          userType: resJson.user.userType,
        })
        if (resJson.user.userType !== 4){
          this.props.history.push('/dashboard')
        } else {
          this.props.history.push('/driver')
        }
      } else {
        this.setState({
          loginError: 'Tài khoản hoặc mật khẩu không chính xác'
        })
      }
    })
  }

  componentDidMount(){
    console.log("access_token", localStorage.getItem('access_token'));
    //nếu đã có access_token -> navigate đến dashboard/driver (tùy loại người dùng)
    if (localStorage.getItem('access_token') !== null){
      this.props.history.push('/dashboard')
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="materialContainer">
        <div className="box">
          <div className="title">Đăng nhập</div>
          <div>
            <TextField
              id="username"
              label="Tên đăng nhập"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal" />
          </div>

          <div>
            <TextField
                id="password"
                label="Mật khẩu"
                type='password'
                style={{fontSize: 100}}
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange('password')}
                margin="normal" />
          </div>

          {this.state.loginError !== ''
          ?
          <Typography  style={{ color: 'red', fontFamily: 'Roboto-Light', fontSize: 12 }}>{this.state.loginError}</Typography>
          : null}

          <div className="button login">
            <button onClick={()=>this.onLogin(this.state.username, this.state.password)}><span>ĐĂNG NHẬP</span> <i className="fa fa-check"></i></button>
          </div>
          <Loading style={{ width: '100%'}} isLoading={this.state.isLoading} backgroundColor="#FFFFFF90" loadingText={"ĐANG ĐĂNG NHẬP..."}/>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  textField: {
    width: '100%',
  },
});


const mapDispatchToProps = dispatch => {
  return {
      doGetUserInfo: (id) => dispatch(getUserInfo(id)),
      doLogin: (username, password) => dispatch(login(username, password))
  };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(Login));
