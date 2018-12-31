import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { haversineDistance } from "../../Utils/FunctionHelper";
import InfoTripModal from "./InfoTripModal";
import {socket} from './../../Utils/FunctionHelper';

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 10.7629123,
        lng: 106.6734333
      },
      currentTrip: null,
      open: false,
    };

    socket.on('server_send_request', (data) => this.onReciveData(data));
  }
  mapClicked(mapProps, map, clickEvent) {
    const { lat, lng } = this.state.location;
    const distanceAllow = haversineDistance(
      [lat, lng],
      [clickEvent.latLng.lat(), clickEvent.latLng.lng()],
      false
    );
    if (distanceAllow) {
      this.setState({
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng()
      });
    } else {
      alert("Khoảng cách lớn hơn 100m");
    }
  }

  onReciveData = (data) => {
    console.log("data from socket key server_send_request", data);
    this.setState({
      currentTrip: data,
      location: data.tripLocation,
      open: true
    })
  }

  handleLogout = () => {
    sessionStorage.removeItem("access_token");
    this.props.history.push("/");
  };

  componentDidMount(){
    console.log('location', this.state.location);
    socket.emit('location_driver', this.state.location);
  }
  render() {
    const { lat, lng } = this.state.location;
    return (
      <div>
        <AppBar title="My App" centered>
          <Tabs>
            <Tab
              label="Logout"
              style={styles.tabStyle}
              onClick={this.handleLogout}
            />
          </Tabs>
        </AppBar>

        <div style={{ flex: 1, zIndex: 2 }}>
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={{
              lat: lat,
              lng: lng
            }}
            gestureHandling={"cooperative"}
            onClick={this.mapClicked.bind(this)}
          >
            <Marker
              onClick={() => {
                alert(1);
              }}
              name={"Current location"}
              position={{ lat: lat, lng: lng }}
            />
          </Map>
        </div>
        <InfoTripModal open={this.state.open} tripInfo={this.state.currentTrip}/>
      </div>
    );
  }
}

const styles = {
  mapStyle: {
    flex: 1,
    paddingBottom: 50
  },
  tabStyle: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center"
  }
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})(Driver);
