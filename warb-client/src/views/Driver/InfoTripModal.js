import React, { Component } from "react";
import { Modal } from "@material-ui/core";
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
    return (
      <Modal
        open={open}
        style={{ width: window.innerWidth, height: window.innerHeight,flex:1,justifyContent:"center" }}
      >
        <div
          style={{
            width: window.innerWidth * 0.5,
            height: window.innerHeight * 0.5,
            backgroundColor: "white",
            borderRadius: 8
          }}
        />
      </Modal>
    );
  }
}
