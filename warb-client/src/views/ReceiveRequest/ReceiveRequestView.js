import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { TextField, Typography } from "@material-ui/core";

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
      [name]: name === 'phone' ? event.target.value.replace(/[^0-9]/g, '') : event.target.value,
    });
  };


  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={0} sm={0} md={2} />
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h2 className={classes.cardTitleWhite}>THÔNG TIN CHUYẾN ĐI</h2>
            </CardHeader>
            <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: 20 }}>
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
                  rows="6"
                />
                <Button round variant="contained" color="primary" style={{ width: 100, marginLeft: 'auto' }}>
                  <Typography style={{ color: '#FFFFFF' }}>Nhận</Typography>
                </Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={0} sm={0} md={2} />
      </GridContainer>
    );
  }
}

const styles = {
  textField: {
    width: '100%',
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

export default withStyles(styles)(ReceiveRequestView);
