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
    const { lat, lng } = this.state
    return (
      <GridContainer >
        {/* <Card>


        </Card> */}
        <Card>
          <CardHeader color="primary">
            <h2>THÔNG TIN ĐỊA CHỈ: {this.state.address}</h2>
          </CardHeader>
          <div style={{ flex: 1, height: window.innerHeight }}>
            <Map
              google={this.props.google}
              zoom={14}
              initialCenter={{
                lat: lat,
                lng: lng
              }}
              style={styles.mapStyle}
              onClick={this.mapClicked.bind(this)}
            >
              <Marker onClick={() => { alert(1) }}
                name={'Current location'}
                position={{ lat: lat, lng: lng }}
              />
            </Map>
          </div>
        </Card>
      </GridContainer>
      // </div>
    );
  }
}

const styles = {
  mapStyle: {
    flex: 1,paddingBottom:50
  }
};
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ")
})(LocateRequestView)