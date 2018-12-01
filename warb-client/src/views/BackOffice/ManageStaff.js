import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "components/Table/Table.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
// import Button from "components/CustomButtons/Button.jsx";
import UserProfile from "components/UserProfile/UserProfile";


const tableDriverHead = [
  { id: 'driverId', label: 'Mã tài xế' },
  { id: 'driverName', label: 'Tên tài xế' },
];

class ManageStaff extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitleSecondary: '',
      tableDriverData: [],
      tableTripData: [],
    };
  }

  render() {
    // const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Table
            tableTitle={'DANH SÁCH NHÂN VIÊN'}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableDriverHead}
            tableData={this.state.tableDriverData}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <UserProfile />
        </GridItem>
      </GridContainer>
    );
  }
}

const styles = {
  username: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  usercategory: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
  },
  userInfoLabel: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  userdob: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
  },
  userphone: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
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

export default withStyles(styles)(ManageStaff);
