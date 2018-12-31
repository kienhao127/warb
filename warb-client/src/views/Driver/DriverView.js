import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";
import { AppBar, Tab, Tabs, Button, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { haversineDistance } from "../../Utils/FunctionHelper";
import InfoTripModal from "./InfoTripModal";
import TripStatusModal from './TripStatusModal';
import { socket } from './../../Utils/FunctionHelper';
import { connect } from "react-redux";
import { getArrayLocation } from "../../store/actions/trip";
import polyUtil from 'polyline-encoded';

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 10.7629123,
        lng: 106.6734333
      },
      currentTrip: null,
      open: false,
      steps: [],
      isTripStatusModelOpen: false,
    };

    socket.on('server_send_request', (data) => this.onReciveData(data));
  }
  mapClicked(mapProps, map, clickEvent) {
    const { lat, lng } = this.state.currentLocation;
    const distanceAllow = haversineDistance(
      [lat, lng],
      [clickEvent.latLng.lat(), clickEvent.latLng.lng()],
      false
    );
    if (distanceAllow) {
      this.setState({
        currentLocation: {
          lat: clickEvent.latLng.lat(),
          lng: clickEvent.latLng.lng()
        }
      });
      this.drawPolyline();
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

  componentDidMount() {
    console.log('location', this.state.currentLocation);
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords);
        this.setState({
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    socket.emit('location_driver', this.state.currentLocation);
  }

  onModalStateChange = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  onDriverAcceptTrip = () => {
    this.drawPolyline();
    this.setState({
      isTripStatusModelOpen: true,
    })
  }

  onDriverMoving = () => {
    this.drawPolyline();
  }

  drawPolyline = () => {
    var endLoaction = {
      lat: this.state.currentTrip.tripLatitude,
      lng: this.state.currentTrip.tripLongitude,
    }
    var arrayLocation = [];
    this.props.doGetArrayLocation(this.state.currentLocation, endLoaction)
      .then(resJson => {
        resJson.object.steps.map(step => {
          var polyline = polyUtil.decode(step.polyline.points);
          polyline.map(latlng => {
            var location = {
              lat: latlng[0],
              lng: latlng[1],
            }
            arrayLocation.push(location);
          })
          console.log(arrayLocation);
        })

        this.setState({
          steps: arrayLocation
        })
      })
  }

  onFinishTrip = () => {
    this.setState({
      isTripStatusModelOpen: false,
      steps: []
    })
  }

  render() {
    const { lat, lng } = this.state.currentLocation;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={styles.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" style={styles.grow}>
                Bản đồ
          </Typography>
              <Button style={styles.button} onClick={this.handleLogout}>Đăng xuất</Button>
            </Toolbar>
          </AppBar>
        </div>

        <div style={styles.mapStyle}>
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={{
              lat: lat,
              lng: lng
            }}
            center={{
              lat: lat,
              lng: lng
            }}
            gestureHandling={"cooperative"}
            onClick={this.mapClicked.bind(this)}
          >
            <Polyline
              path={this.state.steps}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={2} />
            <Marker
              onClick={() => {
                alert(1);
              }}
              name={"Current location"}
              position={{ lat: lat, lng: lng }}
            />
          </Map>
        </div>
        <InfoTripModal onDriverAcceptTrip={this.onDriverAcceptTrip} onModalStateChange={this.onModalStateChange} open={this.state.open} tripInfo={this.state.currentTrip} />
        <TripStatusModal onFinishTrip={this.onFinishTrip} open={this.state.isTripStatusModelOpen}/>
      </div>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    color: '#FFFFFF'
  },
  button: {
    color: '#FFFFFF'
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doGetArrayLocation: (startLocation, endLoaction) => dispatch(getArrayLocation(startLocation, endLoaction)),
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})((connect(null, mapDispatchToProps)(Driver)));
