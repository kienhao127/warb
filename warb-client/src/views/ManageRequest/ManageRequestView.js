import React from "react";
import Table from "components/Table/Table.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

const tableHead = [
  { id: 'tripId', label: 'Mã chuyến đi' },
  { id: 'customerName', label: 'Tên khách' },
  { id: 'address', label: 'Địa chỉ đón khách ' },
  { id: 'requestTime', label: 'Thời gian' },
  { id: 'note', label: 'Ghi chú' },
  { id: 'driverName', label: 'Tài xế' },
  { id: 'status', label: 'Tình trạng' },
];

class ManageRequestView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitle: '',
      tableTitleSecondary: '',
      tableData: [],
    };
  }

  render() {
    // const { classes } = this.props;
    return (
      <Table
        tableTitle={''}
        tableTitleSecondary={this.state.tableTitleSecondary}
        tableHead={tableHead}
        tableData={this.state.tableData}
      />
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

export default withStyles(styles)(ManageRequestView);