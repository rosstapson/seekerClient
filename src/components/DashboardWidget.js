// components/DashboardWidget.js

import React, { Component, PropTypes  } from 'react'

import './components.css';

export default class DashboardWidget extends Component {

  render() {
    //const { errorMessage } = this.props.errorMessage;
    const isAdmin = this.props.isAdmin;

    return (
      <div>
        <div>
        
          <button className="asset-submit-button" onClick={ this.props.displayAssets } >Manage Assets</button>
          
          <button className="asset-submit-button" onClick={ this.props.manageAccount } >Manage Account Details</button>

          {isAdmin &&
            <button className="asset-submit-button" onClick={ this.props.showUsers } >Show Users</button>
            }
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
