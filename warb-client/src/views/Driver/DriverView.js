import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";
import { AppBar, Menu, Button, Toolbar, MenuItem } from "@material-ui/core";
import { haversineDistance } from "../../Utils/FunctionHelper";
import InfoTripModal from "./InfoTripModal";
import TripStatusModal from './TripStatusModal';
import { socket } from './../../Utils/FunctionHelper';
import { connect } from "react-redux";
import { getArrayLocation } from "../../store/actions/trip";
import polyUtil from 'polyline-encoded';
import Avatar from './../../components/Avatar/Avatar';
import Status from './../../components/Status/Status';
import LogoutIcon from '@material-ui/icons/ExitToApp';

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
      anchorEl: null,
      isOnline: -1, 
    };
    socket.on('server_send_request', (data) => this.onReciveData(data));
    socket.on('update_status_driver', (data) => this.onReciveDriverStatus(data));
    socket.on('update_status_trip', (data) => this.onReciveTripStatus(data));
  }

  handleClick = event => {
    this.setState({ anchorEl: this.props.userProfile.status === 2 ? null : event.currentTarget });
  };

  handleClose = (status) => {
    this.setState({ anchorEl: null });
    if (status === 'ONLINE'){
      socket.emit('driver_online', true);
      this.setState({
        isOnline: true,
      })
    } else {
      socket.emit('driver_offline', false);
      this.setState({
        isOnline: false,
      })
    }
  };

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
      if (this.props.userProfile.status === 2){
        this.drawPolyline();
      }
    } else {
      alert("Khoảng cách lớn hơn 100m");
    }
  }

  onReciveData = (data) => {
    console.log("data from socket key server_send_request", data);
    this.setState({
      currentTrip: data,
      open: true
    })
  }

  onReciveDriverStatus = (data) => {
    console.log("data from socket key update_status_driver", data);
    this.setState({
      driverStatus: data.status
    })
  }

  onReciveTripStatus = (data) => {
    console.log("data from socket key update_status_trip", data);
    this.setState({
      currentTrip: data
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
    if (this.props.userProfile != null)
    socket.emit('get_Driver_By_Id', this.props.userProfile.id);
    console.log('userProfile', this.props.userProfile);
  }

  componentWillReceiveProps(newProps) {    
    console.log('Component WILL RECIEVE PROPS!', newProps)
    //Đã có xe nhận
    if (newProps.userProfile){
      console.log('newProps.userProfile WILL RECIEVE PROPS', newProps.userProfile);
      this.setState({
        driverStatus: newProps.userProfile.status
      })
    }
    if (newProps.userProfile && newProps.userProfile.lastTripStatus === 6){
      console.log('this.props.userProfile.lastTripStatus');
      if (this.state.currentTrip === null){
        var endLoaction = {
          lat: newProps.userProfile.lastTripLocation.lat,
          lng: newProps.userProfile.lastTripLocation.lng,
        }
        this.setState({
          currentTrip: newProps.userProfile.lastTrip,
          isTripStatusModelOpen: true
        })
        this.drawPolyline(endLoaction);
      }
    }
    if (newProps.userProfile && newProps.userProfile.lastTripStatus === 4){
      this.setState({
        currentTrip: newProps.userProfile.lastTrip,
        isTripStatusModelOpen: true
      })
    }
 }

  onModalStateChange = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  onDriverAcceptTrip = () => {
    var endLoaction = {
      lat: this.state.currentTrip.tripLatitude,
      lng: this.state.currentTrip.tripLongitude,
    }
    this.drawPolyline(endLoaction);
    this.setState({
      isTripStatusModelOpen: true,
    })
  }

  onDriverMoving = () => {
    var endLoaction = {
      lat: this.state.currentTrip.tripLatitude,
      lng: this.state.currentTrip.tripLongitude,
    }
    this.drawPolyline(endLoaction);
  }

  drawPolyline = (endLoaction) => {
    console.log('start', this.state.currentLocation);
    console.log('end', endLoaction);
    var arrayLocation = [];
    this.props.doGetArrayLocation(this.state.currentLocation, endLoaction)
      .then(resJson => {
        console.log('doGetArrayLocation' ,resJson);
        if (resJson.returnCode !== 0){
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
        }
      })
      .catch(error => console.log(error));
  }

  onFinishTrip = () => {
    this.setState({
      isTripStatusModelOpen: false,
      steps: []
    })
  }

  render() {
    const { lat, lng } = this.state.currentLocation;
    const { anchorEl, driverStatus } = this.state;
    const {userProfile} = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={styles.root}>
          <AppBar position="static">
            <Toolbar>
            <div style={styles.root}>

            {userProfile != null && userProfile != undefined ?
              <div style={styles.grow}>
                <Avatar width={40} content={userProfile.fullname} colorString={userProfile.phone}/>
                <Button
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  style={{color: '#FFF'}}
                >
                  <div style={{marginRight: 10, fontSize: 20}}>{userProfile.fullname}</div>
                  <Status status={driverStatus} />
                </Button>
              </div>
              : null }
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
              >
                <MenuItem onClick={() => this.handleClose('ONLINE')}>
                  <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{marginRight: 10, }}>Online</div>
                    <Status status={1} />
                  </div>
                </MenuItem>
                <MenuItem onClick={() => this.handleClose('OFFLINE')}>
                  <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{marginRight: 10, }}>Offline</div>
                    <Status status={3} />
                  </div>
                </MenuItem>
              </Menu>
            </div>
              <Button style={styles.button} onClick={this.handleLogout}>
                <LogoutIcon style={{fontSize: 30}}/>
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        <div style={styles.mapStyle}>
          <Map
            google={this.props.google}
            zoom={16}
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
        <TripStatusModal onFinishTrip={this.onFinishTrip} open={this.state.isTripStatusModelOpen} tripInfo={this.state.currentTrip}/>
      </div>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
    display:'flex', 
    flexDirection: 'row',
  },
  grow: {
    flexGrow: 1,
    color: '#FFFFFF',
    display:'flex', 
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    alignItems: 'flex-start'
  },
  button: {
    color: '#FFFFFF',
  }
};

const mapStateToProps = state => {
  return {
    userProfile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetArrayLocation: (startLocation, endLoaction) => dispatch(getArrayLocation(startLocation, endLoaction)),
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})((connect(mapStateToProps, mapDispatchToProps)(Driver)));
