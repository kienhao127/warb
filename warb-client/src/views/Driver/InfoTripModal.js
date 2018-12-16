import React, { Component } from "react";
import { CardContent, Button, Card } from "@material-ui/core";
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
    const { open } = this.state;
    const name = "Hoàng Nam";
    const numberPhone = "01203241687";
    const address = "c4-402 chugng ccc";
    return (
      <div
        style={{
          width: window.innerWidth * 0.5,
          height: window.innerHeight * 0.25,
          backgroundColor: "#F2F2F2",
          borderRadius: 8,
          zIndex: 1,
          position: "absolute",
          bottom: 10,
          left: window.innerWidth * 0.25,
          right: window.innerWidth * 0.25,
          borderColor:"black",
          borderWidth:1
        }}
      >
        <div style={{ width: "75%", float: "left" }}>
          <CardContent>
            <p style={{ fontFamily: "Roboto-Light" }}>
              Tên khách hàng: {name}
            </p>
          </CardContent>
          <CardContent>
            <p style={{ fontFamily: "Roboto-Light" }}>
              Số điện thoại khách hàng: {numberPhone}
            </p>
          </CardContent>
          <CardContent>
            <p style={{ fontFamily: "Roboto-Light" }}>
              Địa chỉ đón khách: {address}
            </p>
          </CardContent>
        </div>

        <div style={{ width: "25%", float: "right", height: "100%" }}>
          <CardContent>
            <Button variant="contained" color="primary"
            style={{fontSize:12,color:'white',width:120}}
            >
              Nhận chuyến
            </Button>
          </CardContent>
          <CardContent>
            <Button variant="contained" color="secondary"
             style={{fontSize:12,width:120}} 
            >
              Huỷ chuyến
            </Button>
          </CardContent>
        </div>
      </div>
    );
  }
}