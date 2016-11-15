// components/DashboardWidget.js

import React, { Component, PropTypes  } from 'react'

import './components.css';

export default class DashboardWidget extends Component {

  render() {
    //const { errorMessage } = this.props.errorMessage;
    

    return (
      <div>
        <div>
        
          <button className="asset-submit-button" onClick={ this.props.displayAssets } >Display Assets</button>
          <button className="asset-submit-button" onClick={ this.props.manageAssets } >Manage Assets</button>
          <button className="asset-submit-button" onClick={ this.props.manageAccount } >Manage Account Details</button>
        </div>
        <div>
          <button className="asset-submit-button" onClick={ this.props.logout } >Secure Logout</button>
        </div>
        
      </div>
    )
  }

  
}

DashboardWidget.propTypes = {  
  displayAssets: PropTypes.func,
  manageAssets: PropTypes.func,
  manageAccount: PropTypes.func,
  logout: PropTypes.func
}
