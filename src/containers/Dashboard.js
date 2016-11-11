// components/Dashboard.js

import React, { Component, PropTypes } from 'react'
//import { browserHistory } from 'react-router';

export default class Dashboard extends Component {
constructor(props) {
  super(props);
  console.log("Dashboard constructor()");
  
   
  
}  
  render() {
    const errorMessage = this.props.errorMessage;
    const username = localStorage.username;

    return (
      <div>
        <h2> User { username } Dashboard</h2>
        {errorMessage}
      </div>
    )
  }

  
}

Dashboard.propTypes = {
  
  errorMessage: PropTypes.string
}
