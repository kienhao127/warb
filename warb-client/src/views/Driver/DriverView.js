import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import GridContainer from "../../components/Grid/GridContainer";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { AppBar,Tab,Tabs } from '@material-ui/core';
import { haversineDistance } from '../../Utils/FunctionHelper'
class Driver extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 10.7629123,
            lng: 106.6734333
        }
    }
    mapClicked(mapProps, map, clickEvent) {
        const { lat, lng } = this.state
        const distanceAllow = haversineDistance([lat, lng], [clickEvent.latLng.lat(), clickEvent.latLng.lng()], false)
        if (distanceAllow) {
            this.setState({
                lat: clickEvent.latLng.lat(),
                lng: clickEvent.latLng.lng()
            })
        }
        else {
            alert("Khoảng cách lớn hơn 100m")
        }

    }
    render() {
        const { lat, lng } = this.state
        return (
            // <GridContainer >
            <div>
                <AppBar title="My App">
                    <Tabs>
                        <Tab label="Item 1" />
                        <Tab label="Item 2" />
                        <Tab label="Item 3" />
                        <Tab label="Item 4" />
                    </Tabs>
                </AppBar>

                <div style={{ flex: 1 }}>
                    <Map
                        google={this.props.google}
                        zoom={14}
                        initialCenter={{
                            lat: lat,
                            lng: lng
                        }}
                        gestureHandling={'cooperative'}
                        // style={styles.mapStyle}
                        onClick={this.mapClicked.bind(this)}
                    >
                        <Marker onClick={() => { alert(1) }}
                            name={'Current location'}
                            position={{ lat: lat, lng: lng }}
                        />
                    </Map>
                </div>
            </div>
            // </GridContainer>

        );
    }
}

const styles = {
    mapStyle: {
        flex: 1, paddingBottom: 50
    }
};
export default GoogleApiWrapper({
    apiKey: ("AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ")
})(Driver)
