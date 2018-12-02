import React from "react";
import './Login.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { login } from "../../store/actions/user";
import { Typography } from "@material-ui/core";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',

      loginError: '',
    };
  }
  

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onLogin = (username, password) => {
    this.props.doLogin(username, password)
    .then(resJson => {
      if (resJson.returnCode === 1){
        this.setState({
          loginError: ''
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

  render() {
    const { classes } = this.props;
    return (
      <div className="materialContainer">
        <div className="box">
          <div className="title">Đăng nhập</div>
          <div>
            <TextField
              id="standard-name"
              label="Tên đăng nhập"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal" />
          </div>

          <div>
            <TextField
                id="standard-name"
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
      doLogin: (username, password) => dispatch(login(username, password))
  };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(Login));
