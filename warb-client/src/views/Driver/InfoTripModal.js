import React, { Component } from "react";
import { CardContent, Button } from "@material-ui/core";
import { socket } from "../../Utils/FunctionHelper";
export default class InfoTripModal extends Component {
  
  onAcceptTripClick = (receiveTripTime) => {
    if (new Date().getTime() - receiveTripTime >= 10000){
      alert('Đã quá thời hạn nhận chuyến!');
    } else {
      socket.emit('accept_request', true);
    }
   this.props.onModalStateChange();
   this.props.onDriverAcceptTrip();
  }

  onCancelTripClick = () => {
    socket.emit('destroy_request', true);
    this.props.onModalStateChange();
  }

  render() {
    const { tripInfo, open, receiveTripTime} = this.props;
    if (open == true){
      return (
        <div style={{
          position: "absolute",
          bottom: 10,
          left: window.innerWidth * 0.1,
          right: window.innerWidth * 0.1,
          backgroundColor: "#F2F2F2",
          minWidth: 300
        }}>
          <div>
            <CardContent>
              <p style={{ fontFamily: "Roboto-Light" }}>
                Tên khách hàng: {tripInfo.customerName}
              </p>
            </CardContent>
            <CardContent>
              <p style={{ fontFamily: "Roboto-Light" }}>
                Số điện thoại khách hàng: {tripInfo.customerPhone}
              </p>
            </CardContent>
            <CardContent>
              <p style={{ fontFamily: "Roboto-Light" }}>
                Địa chỉ đón khách: {tripInfo.customerAddress}
              </p>
            </CardContent>
          </div>
  
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <CardContent>
              <Button variant="contained" color="primary"
                style={{ fontSize: 12, color: 'white', width: 120 }}
                onClick={() => this.onAcceptTripClick(receiveTripTime)}
              >
                Nhận chuyến
                </Button>
            </CardContent>
            <CardContent>
              <Button variant="contained" color="secondary"
                style={{ fontSize: 12, width: 120 }}
                onClick={this.onCancelTripClick}
              >
                Huỷ chuyến
                </Button>
            </CardContent>
          </div>
        </div>
      );
    }
    else {
      return(
        <div></div>
      )
    }

    
  }
}