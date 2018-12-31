import React, { Component } from "react";
import { CardContent, Button } from "@material-ui/core";
export default class InfoTripModal extends Component {
  state = {
    open: false
  };
  showPopup() {
    this.setState({
      open: true
    });
  }
  closePopup() {
    this.setState({
      open: false
    });
  }
  render() {
    const { tripInfo, open} = this.props;
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
              >
                Nhận chuyến
                </Button>
            </CardContent>
            <CardContent>
              <Button variant="contained" color="secondary"
                style={{ fontSize: 12, width: 120 }}
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