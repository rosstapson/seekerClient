// components/DashboardWidget.js

import React, { Component, PropTypes  } from 'react'

import './components.css';
import assets from './icons/assets.png';
import profile from './icons/profile.png';
import users from './icons/users.png';

export default class DashboardWidget extends Component {

  render() {
    //const { errorMessage } = this.props.errorMessage;
    //console.log("still admin? " + this.props.isAdmin);
    return (
      <div>
        <div>
        
          <button onClick={ this.props.displayAssets }> <img src={assets} alt="Assets" /></button>
        
          <button onClick={ this.props.manageAccount } ><img src={profile} alt="Profile" /></button>
      
          {this.props.isAdmin &&
            <button onClick={ this.props.showUsers } ><img src={users} alt="Users" /></button>  
            
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
