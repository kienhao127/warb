import React from "react";
import './Login.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }
  

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onLogin = (username, password) => {
    this.props.history.push('/dashboard')
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

export default withStyles(styles)(Login);
