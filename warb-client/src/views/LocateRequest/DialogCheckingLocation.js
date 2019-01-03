import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import { Button, CardContent } from "@material-ui/core";
import { updateInfoTrip } from "../../store/actions/trip";
import AlertDialog from "../../components/Dialog/AlertDialog";
import {socket} from './../../Utils/FunctionHelper';
import { connect } from "react-redux";
class DialogCheckingLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen:false
    };
  }
  mapClicked(mapProps, map, clickEvent) {
    const { updateTrip } = this.props;
    updateTrip({
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    });
  }
  _sentInfoTrip = () => {
    const { info } = this.props;
    const self = this
    this.props.doUpdateTrip(
      info.id,
      info.tripLocation,
      info.tripLongitude,
      info.tripLatitude,
      2
    ).then(()=>{
      socket.emit("done_locationer",info.id)
      self.setState({
        isDialogOpen:true
      })
    })
  };
  handleClose=()=>{
    const {removeTripUpdated,info} = this.props
    this.setState({
      isDialogOpen:false
    },()=>{
      removeTripUpdated(info.id)
    })
  }
  render() {
    const { address } = this.state;
    const { classes, info } = this.props;
    return (
      <Modal open={this.props.open} onClose={this.handleClose}>
        <div className={classes.paper}>
        <AlertDialog open={this.state.isDialogOpen} title="Thông báo" content={'Đã thay đổi trạng thái chuyến đi.'}  onClose={this.handleClose}/>
          <Card>
            <CardHeader color="primary">
              <h2>
                THÔNG TIN ĐỊA CHỈ: {address}
              </h2>
            </CardHeader>
            <div style={{ flex: 1, height: window.innerHeight }}>
              <Map
                google={this.props.google}
                zoom={14}
                initialCenter={{
                  lat: info.tripLatitude,
                  lng: info.tripLongitude
                }}
                gestureHandling={"cooperative"}
                style={styles.mapStyle}
                onClick={this.mapClicked.bind(this)}
              >
                <Marker
                  name={"Current location"}
                  position={{ lat: info.tripLatitude, lng: info.tripLongitude }}
                />
              </Map>
            </div>
          </Card>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              bottom: 10,
              right: 10
            }}
          >
            <CardContent>
              <Button
                variant="contained"
                color="secondary"
                style={{ fontSize: 12, width: 120 }}
                onClick={this.props._closeDialog}
              >
                Huỷ
              </Button>
            </CardContent>
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: 12, color: "white", width: 120 }}
                onClick={this._sentInfoTrip}
              >
                Xác nhận
              </Button>
            </CardContent>
          </div>
        </div>
      </Modal>
    );
  }
}

const styles = theme => ({
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
});

const mapDispatchToProps = dispatch => {
  return {
    doUpdateTrip: (id, tripLocation, tripLongitude, tripLatitude, status) =>
      dispatch(
        updateInfoTrip(id, tripLocation, tripLongitude, tripLatitude, status)
      )
  };
};

const DialogCheckingLocationWithStyle = withStyles(styles)(
  DialogCheckingLocation
);
const DialogCheckingLocationWithMap = GoogleApiWrapper({
  apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})(DialogCheckingLocationWithStyle);

const mapStateToProps = state => {
  return {
    infoTrip: state.user.infoTrip
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DialogCheckingLocationWithMap
);
