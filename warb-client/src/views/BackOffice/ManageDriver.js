import React from "react";
import Table from "components/Table/Table.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import UserProfile from "components/UserProfile/UserProfile";
import { connect } from "react-redux";
import { getUserForType } from "../../store/actions/user";
import { getTripByDriverId } from "../../store/actions/trip";

const tableDriverHead = [
  { id: 'id', label: 'Mã tài xế' },
  { id: 'fullname', label: 'Tên tài xế' },
  { id: 'statusName', label: 'Tình trạng tài xế' },
];

const tableTripHead = [
  { id: 'id', label: 'Mã chuyến đi' },
  { id: 'customerName', label: 'Tên khách' },
  { id: 'customerAddress', label: 'Địa chỉ đón khách ' },
  { id: 'requestTime', label: 'Thời gian', type: 'time' },
  { id: 'note', label: 'Ghi chú' },
  { id: 'statusName', label: 'Tình trạng' },
];


class ManageDriver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitleSecondary: '',
      tableDriverData: [],
      tableTripData: [],

      userInfo: null,
    };
  }

  componentDidMount(){
    this.props.doGetUserForType(0)
    .then(resJson => {
      console.log('resJson', resJson);
      this.setState({
        tableDriverData: resJson.object,
        userInfo: resJson.object[0]
      })
      this.getTripByDriverId(resJson.object[0].id);
    })
    .catch(error =>{
      console.log('doGetUserForType error', error);
    })
  }

  getTripByDriverId = (driverId) => {
    this.props.doGetTripByDriverId(driverId)
    .then(resJson => {
      console.log(resJson);
      this.setState({
        tableTripData: resJson.object,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  onTableRowClick = (item) => {
    this.setState({
      userInfo: item
    })
    this.getTripByDriverId(item.id);
  }

  render() {
    // const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Table
            tableTitle={'DANH SÁCH TÀI XẾ'}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableDriverHead}
            tableData={this.state.tableDriverData}
            onTableRowClick={this.onTableRowClick}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          {this.state.userInfo != null
          ? 
          <UserProfile userInfo={this.state.userInfo} />
          :
          null}
        </GridItem>
        <GridItem xs={12} sm={12} md={12} >
          <Table
            tableTitle={'DANH SÁCH CHUYẾN ĐI'}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableTripHead}
            tableData={this.state.tableTripData}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doGetUserForType: (dif) => dispatch(getUserForType(dif)),
    doGetTripByDriverId: (driverId) => dispatch(getTripByDriverId(driverId)),
  };
};

export default connect(null, mapDispatchToProps)(ManageDriver);
