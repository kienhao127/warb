import React from "react";
import Table from "components/Table/Table.jsx";

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
      tableTitle: 'Danh sách chuyến đi',
      tableTitleSecondary: '',
      tableData: [],
    };
  }

  render() {
    return (
      <div>
          <Table
            tableTitle={this.state.tableTitle}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableHead}
            tableData={this.state.tableData}
          />
      </div>
    );
  }
}

export default ManageRequestView;
