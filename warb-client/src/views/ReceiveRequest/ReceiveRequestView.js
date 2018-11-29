import React from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Card, Button, Typography } from "@material-ui/core";
import GridContainer from './../../components/Grid/GridContainer';
import GridItem from './../../components/Grid/GridItem';

class ReceiveRequestView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      address: '',
      note: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: name === 'phone' ? event.target.value.replace(/[^0-9]/g, '') :  event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={0} sm={0} md={2}></GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  id="standard-name"
                  label="Họ tên"
                  className={classes.textField}
                  style={{ marginRight: 10 }}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Số điện thoại"
                  className={classes.textField}
                  style={{ marginLeft: 10 }}
                  value={this.state.phone}
                  onChange={this.handleChange('phone')}
                  margin="normal"
                />
              </div>
              <TextField
                id="standard-name"
                label="Địa chỉ đón khách"
                className={classes.textField}
                value={this.state.address}
                onChange={this.handleChange('address')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Ghi chú"
                className={classes.textField}
                value={this.state.note}
                onChange={this.handleChange('note')}
                margin="normal"
                multiline
                rows="5"
              />
              <Button variant="contained" color="primary" style={{ width: 100, marginLeft: 'auto' }}>
                <Typography style={{ color: '#FFFFFF' }}>Nhận</Typography>
              </Button>
            </Card>
          </div>
        </GridItem>
        <GridItem xs={0} sm={0} md={2}></GridItem>
      </GridContainer>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

export default withStyles(styles)(ReceiveRequestView);
