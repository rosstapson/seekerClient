// components/Dashboard.js

import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router';

export default class Dashboard extends Component {
constructor(props) {
  super(props);
  console.log("Dashboard constructor()");
   if (!localStorage.isAuthenticated) {
     browserHistory.push('/login');
   }
  
}  
  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <h2> Dashboard </h2>
        {errorMessage}
      </div>
    )
  }

  
}

Dashboard.propTypes = {
  
  errorMessage: PropTypes.string
}
