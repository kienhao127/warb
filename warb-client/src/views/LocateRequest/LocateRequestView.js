import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { TextField, Typography } from "@material-ui/core";

class LocateRequestView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: "Nhà Thờ Đức Bà",
      lat: 10.7629123,
      lng: 106.6734333///Lat  lng này đợi server gửi qua tạm thời set mặc định
    }
  }
  mapClicked(mapProps, map, clickEvent) {
    this.setState({
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    })
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      // <div style={{ flex: 1, backgroundColor: "red" }} >
      <GridContainer>
        <Card>
          <CardHeader color="primary">
            <h2>THÔNG TIN ĐỊA CHỈ: {this.state.address}</h2>
          </CardHeader>

        </Card>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 10.7629123,
            lng: 106.6734333
          }}
          style={styles.mapStyle}
          onClick={this.mapClicked.bind(this)}
        >
          <Marker onClick={() => { alert(1) }}
            name={'Current location'}
            position={{ lat: this.state.lat, lng: this.state.lng }}
          />
        </Map>
      </GridContainer>
      // </div>
    );
  }
}

const styles = {
  mapStyle: {
  }
};
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ")
})(LocateRequestView)