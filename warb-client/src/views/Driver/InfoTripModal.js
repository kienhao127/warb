import React, { Component } from "react";
import { CardContent, Button, Card } from "@material-ui/core";
import { socket } from "../../Utils/FunctionHelper";
export default class InfoTripModal extends Component {

  onAcceptTripClick = (receiveTripTime) => {
    if (new Date().getTime() - receiveTripTime >= 10000) {
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
    const { tripInfo, open, receiveTripTime } = this.props;
    if (open == true) {
      return (
        <Card style={{
          position: "absolute",
          bottom: 10,
          left: window.innerWidth * 0.1,
          right: window.innerWidth * 0.1,
          backgroundColor: "#FFFFFF",
          minWidth: 300,
          borderRadius: 10
        }}>
          <div>
            <p style={styles.text}>
              <p style={{ fontFamily: 'Roboto-Medium' }}>Tên khách hàng: </p>
              {tripInfo.customerName}
            </p>
            <p style={styles.text}>
              <p style={{ fontFamily: 'Roboto-Medium' }}>Số điện thoại: </p>
              {tripInfo.customerPhone}
            </p>
            <p style={styles.text}>
              <p style={{ fontFamily: 'Roboto-Medium' }}>Địa chỉ đón khách: </p>
              {tripInfo.customerAddress}
            </p>
            <p style={styles.text}>
              <p style={{ fontFamily: 'Roboto-Medium' }}>Ghi chú: </p>
              {tripInfo.note}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant="contained" color="primary"
              style={{ fontSize: 12, color: 'white', width: 120, margin: 10 }}
              onClick={() => this.onAcceptTripClick(receiveTripTime)}
            >
              Nhận chuyến
            </Button>
            
            <Button variant="contained" color="secondary"
              style={{ fontSize: 12, width: 120, margin: 10 }}
              onClick={this.onCancelTripClick}
            >
              Huỷ chuyến
            </Button>
          </div>
        </Card>
      );
    }
    else {
      return (
        <div></div>
      )
    }
  }
}

const styles = {
  text: {
    fontFamily: "Roboto-Light",
    padding: 10
  },
}