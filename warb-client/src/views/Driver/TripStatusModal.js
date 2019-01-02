import React, { Component } from "react";
import { CardContent, Button, Card } from "@material-ui/core";
import { socket } from "../../Utils/FunctionHelper";

export default class TripStatusModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDriving: false,
        };
    }

    onStartTrip = () => {
        this.setState({
            isDriving: true,
        })
        socket.emit('begin_trip', this.props.tripInfo);
    }

    onFinishTrip = () => {
        this.setState({
            isDriving: false,
        })
        this.props.onFinishTrip();
        socket.emit('end_trip', this.props.tripInfo);
    }

    render() {
        const {open} = this.props;
        if (open == true) {
            return (
                <Card style={{
                    position: "absolute",
                    bottom: 10,
                    left: window.innerWidth * 0.1,
                    right: window.innerWidth * 0.1,
                    backgroundColor: "#FFFFFF",
                    minWidth: 300,
                    borderRadius: 10
                }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="contained" color="primary"
                            disabled={this.props.tripInfo.status === 4 ? true : false}
                            style={{ fontSize: 12, color: 'white', width: 120, margin: 10 }}
                            onClick={this.onStartTrip}
                        >
                            Bắt đầu
                        </Button>

                        <Button variant="contained" color="secondary"
                            disabled={this.props.tripInfo.status === 4 ? false : true}
                            style={{ fontSize: 12, width: 120, margin: 10 }}
                            onClick={this.onFinishTrip}
                        >
                            Kết thúc
                        </Button>
                    </div>
                </Card>
            );
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

const styles = {
    text: {
        fontFamily: "Roboto-Light",
        padding: 10
    },
}