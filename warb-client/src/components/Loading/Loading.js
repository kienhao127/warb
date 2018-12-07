import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
  }

  render() {
      if(this.props.isLoading){
        return (
            <div style={{ ...this.props.style, backgroundColor: this.props.backgroundColor, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
              <div class="loading">
                <div class="bounceball"></div>
                <div class="text">{this.props.loadingText}</div>
              </div>
            </div>
          );
      } else {
          return(
              <div></div>
          );
      }
       
    }
}
