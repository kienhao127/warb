import React from "react";

class Driver extends React.Component {
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
