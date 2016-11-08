// components/ErrorMessage.js

import React, { Component, PropTypes } from 'react'
import './components.css';

export default class ErrorMessage extends Component {

  render() {
    const { errorMessage } = this.props.errorMessage;
    //const { errorHeading } = this.props.errorHeading;

    return (
      <div>
        <div className="errorHeading"> Error </div>
        
        <div className="errorMessage"> { errorMessage } </div>
       
      </div>
    )
  }

  
}

ErrorMessage.propTypes = {
  //errorHeading: PropTypes.string,
  errorMessage: PropTypes.string
}
