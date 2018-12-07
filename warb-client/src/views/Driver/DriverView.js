import React from "react";

class Driver extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('access_token') === null) {
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div style={styles.wrapper}>
                Driver
      </div>
        );
    }
}

const styles = {
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh",
        backgroundColor: '#EFEFEF'
    }
}

export default Driver;
