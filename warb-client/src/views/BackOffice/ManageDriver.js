import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "components/Table/Table.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import avatar from "assets/img/faces/marc.jpg";

const tableDriverHead = [
  { id: 'driverId', label: 'Mã tài xế' },
  { id: 'driverName', label: 'Tên tài xế' },
];

const tableTripHead = [
  { id: 'tripId', label: 'Mã chuyến đi' },
  { id: 'cusomterName', label: 'Tên khách hàng' },
  { id: 'beginAddress', label: 'Địa chỉ đón khách' },
  { id: 'endAddress', label: 'Địa chỉ trả khách' },
];


class ManageDriver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitleSecondary: '',
      tableDriverData: [],
      tableTripData: [],
    };
  }
  
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h2 className={classes.cardTitleWhite}>DANH SÁCH NHÂN VIÊN</h2>
          </CardHeader>
          <CardBody>
          <Table
            tableTitle={''}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableDriverHead}
            tableData={this.state.tableDriverData}
          />  </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don't be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} >
        <Card>
          <CardHeader color="primary">
            <h2 className={classes.cardTitleWhite}>DANH SÁCH CHUYẾN ĐI</h2>
          </CardHeader>
          <CardBody>
            <Table
              tableTitle={''}
              tableTitleSecondary={this.state.tableTitleSecondary}
              tableHead={tableTripHead}
              tableData={this.state.tableTripData}
            />
            </CardBody>
            </Card>
          </GridItem>
      </GridContainer>
    );
  }
}

const styles = {
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


export default withStyles(styles)(ManageDriver);
