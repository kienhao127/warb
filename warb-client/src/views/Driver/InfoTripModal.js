import React, { Component } from "react";
import { CardContent } from "@material-ui/core";
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
    const name = "Hoàng Nam"
    const numberPhone= "01203241687"
    const address = "c4-402 chugng ccc"
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
          borderColor:"red",
          borderWidth:1
        }}
      >
      
      <CardContent>
        <p style={{fontFamily: 'Roboto-Light'}}>Tên khách hàng: {name}</p>
      </CardContent>
      <CardContent>
        <p style={{fontFamily: 'Roboto-Light'}}>Số điện thoại khách hàng: {numberPhone}</p>
      </CardContent>
      <CardContent>
        <p style={{fontFamily: 'Roboto-Light'}}>Địa chỉ đón khách: {address}</p>
      </CardContent>
      </div>
    );
  }
}
