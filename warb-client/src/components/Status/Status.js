import React from "react";
import { Typography } from "@material-ui/core";

class Status extends React.Component {
    
    render() {
    const { status } = this.props;
    if (status === 1){
        return (
            <div style={{width: 10, height: 10, backgroundColor: 'green', borderRadius: 5}}/>
        );      
    }
    if (status === 3){
        return (
            <div style={{width: 10, height: 10, backgroundColor: 'gray', borderRadius: 5}}/>
        );    
    }
    return (
        <div style={{width: 10, height: 10, backgroundColor: 'red', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}/>
    );    
    }
}


const styles = {
};

export default Status;
