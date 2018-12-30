import React, { Component } from "react";
import DialogCheckingLocation from "./DialogCheckingLocation";
import { connect } from "react-redux";
import Table from "components/Table/Table.jsx";
import {socket} from './../../Utils/FunctionHelper';
import { getTripByStatus } from "../../store/actions/trip";
const tableHead = [
  { id: "id", label: "Mã chuyến đi" },
  { id: "customerName", label: "Tên khách" },
  { id: "customerAddress", label: "Địa chỉ đón khách " },
  { id: "requestTime", label: "Thời gian", type: "time" },
  { id: "note", label: "Ghi chú" },
  { id: "driverName", label: "Tài xế" },
  { id: "statusName", label: "Tình trạng" }
];
class LocateRequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableTitle: "",
      tableTitleSecondary: "",
      tableData: [],
      open:false,
      infoTrip:{}
    };
  }
  
  componentDidMount() {
    this.props
      .doGetAllTripStatus()
      .then(resJson => {
        this.setState({
          tableData: resJson.object
        });
      })
      .catch(error => {
        console.log("get all trip error");
      });
  }
  _closeDialog=()=>{
    this.setState({
      open:false
    })
  }
  render() {
    const { open,infoTrip } = this.state;

    return (
      <div>
        <Table
          tableTitle={"DANH SÁCH CHUYẾN ĐI"}
          tableTitleSecondary={this.state.tableTitleSecondary}
          tableHead={tableHead}
          tableData={this.state.tableData}
          onTableRowClick={data => {
            this.setState({
              infoTrip:data
            },()=>{
              this.setState({
                open:!open,
              })
            })
          }}
        />
        <DialogCheckingLocation
        open={open}
        infoTrip={infoTrip}
        _closeDialog={this._closeDialog}
        />
      </div>
    );
  }
}

const styles = {
  mapStyle: {
    flex: 1,
    paddingBottom: 50
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doGetAllTripStatus: () => dispatch(getTripByStatus(2))
  };
};

export default connect(null, mapDispatchToProps)(LocateRequestView);
