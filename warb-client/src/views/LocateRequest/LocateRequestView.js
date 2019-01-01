import React, { Component } from "react";
import DialogCheckingLocation from "./DialogCheckingLocation";
import { connect } from "react-redux";
import Table from "components/Table/Table.jsx";
import { socket } from "./../../Utils/FunctionHelper";
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
      open: false,
      infoTrip: {}
    };
    socket.on('server_send_trip', (data) => this.onReciveData(data));
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
  _closeDialog = () => {
    this.setState({
      open: false
    });
  };
  passParam = data => {

  };
  
  onReciveData = (data) => {
    console.log("data from socket key server_send_trip", data);
    var trips = this.state.tableData;
    trips.push(data);
    this.setState({
      tableData: trips,
    })
  }

  render() {
    const { open, infoTrip } = this.state;
    return (
      <div>
        <Table
          tableTitle={"DANH SÁCH CHUYẾN ĐI"}
          tableTitleSecondary={this.state.tableTitleSecondary}
          tableHead={tableHead}
          tableData={this.state.tableData}
          buttonContent={"Định Vị"}
          unDisabledStatusId={1}
          onTableRowClick={data => {
            this.setState({
              infoTrip: data,
              open: !open
            });
          }}
        />
        
        <DialogCheckingLocation
          ref={this.myRef}
          open={open}
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
    doGetAllTripStatus: () => dispatch(getTripByStatus(1)),
    saveInfoTrip: data => {
      dispatch({
        type: "SAVE_INFOTRIP",
        infoTrip: data
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(LocateRequestView);
