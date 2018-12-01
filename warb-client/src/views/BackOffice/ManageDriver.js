import React from "react";
import Table from "components/Table/Table.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import UserProfile from "components/UserProfile/UserProfile";

const tableDriverHead = [
  { id: 'driverId', label: 'Mã tài xế' },
  { id: 'driverName', label: 'Tên tài xế' },
  { id: 'statusName', label: 'Tình trạng tài xế' },
];

const tableTripHead = [
  { id: 'tripId', label: 'Mã chuyến đi' },
  { id: 'cusomterName', label: 'Tên khách hàng' },
  { id: 'address', label: 'Địa chỉ đón khách' },
  { id: 'statusName', label: 'Tình trạng chuyến đi' },
];


class ManageDriver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitleSecondary: '',
      tableDriverData: [
        { driverId: 1, driverName: 'Nguyễn Văn A' },
        { driverId: 2, driverName: 'Trần Thị B' },
      ],
      tableTripData: [],
      rowId: 0,
    };
  }

  onTableRowClick = (rowId) => {
    this.setState({
      rowId: rowId
    })
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
          <UserProfile />
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

export default ManageDriver;
