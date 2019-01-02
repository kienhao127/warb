import React from "react";
import Table from "components/Table/Table.jsx";
import { connect } from "react-redux";
import { getAllTrip } from "../../store/actions/trip";
import {socket} from './../../Utils/FunctionHelper';

const tableHead = [
  { id: 'id', label: 'Mã chuyến đi' },
  { id: 'customerName', label: 'Tên khách' },
  { id: 'customerAddress', label: 'Địa chỉ đón khách ' },
  { id: 'requestTime', label: 'Thời gian', type: 'time' },
  { id: 'note', label: 'Ghi chú' },
  { id: 'driverName', label: 'Tài xế' },
  { id: 'statusName', label: 'Tình trạng' },
  { id: '', label: '' },
];

class ManageRequestView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitle: '',
      tableTitleSecondary: '',
      tableData: [],
    };

    socket.on('server_send_trip', (data) => this.onReciveData(data));
    socket.on('update_status_trip', (data) => this.onUpdateStatusTrip(data));
  }

  componentDidMount(){
    this.props.doGetAllTrip()
    .then(resJson => {
      this.setState({
        tableData: resJson.object
      })
    })
    .catch(error => {
      console.log('get all trip error');
    })
  }

  onReciveData = (data) => {
    console.log("data from socket key server_send_trip", data);
    var trips = this.state.tableData;
    trips.unshift(data);
    this.setState({
      tableData: trips,
    })
  }

  onUpdateStatusTrip = (data) => {
    console.log("data from socket key update_status_trip", data);
    var trips = this.state.tableData;
    trips.map(trip => {
      if (trip.id === data.id){
        trip.status = data.status;
        trip.statusId = data.statusId;
        trip.statusName = data.statusName;
      }
    })
    this.setState({
      tableData: trips
    })
  }

  render() {
    // const { classes } = this.props;
    return (
      <Table
        tableTitle={'DANH SÁCH CHUYẾN ĐI'}
        tableTitleSecondary={this.state.tableTitleSecondary}
        tableHead={tableHead}
        tableData={this.state.tableData}
        buttonContent={"Gửi đi"}
        unDisabledStatusId={2}
        onTableRowClick={(data)=>{
          console.log('request-client', data);
          socket.emit('request-client', data);
          data.status = 3;
          data.statusId = 3;
          data.statusName = 'Đang gửi yêu cầu';
          var trips = this.state.tableData;
          trips.map(trip => {
            if (trip.id === data.id){
              trip = data;
            }
          })
          this.setState({
            tableData: trips
          })
          // this.props.history.push("/dashboard/locaterequest",{infoTrip:data});
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doGetAllTrip: () => dispatch(getAllTrip())
  };
};

export default connect(null, mapDispatchToProps)(ManageRequestView);