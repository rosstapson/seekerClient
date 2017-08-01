// components/Dashboard.js

import React, {Component, PropTypes} from 'react'
import DashboardWidget from '../components/DashboardWidget'

import {browserHistory} from 'react-router';

export default class Dashboard extends Component {
  
  render() {
    const errorMessage = this.props.errorMessage;
    const username = localStorage.username;
    //console.log("is admin? " + localStorage.isAdmin);
    //const isAdmin = localStorage.isAdmin;

    return (
      <div>
        <div className="asset-title">
          User&nbsp;{username}&nbsp;Dashboard
        </div>
        {errorMessage}
        <DashboardWidget
          displayAssets={this.displayAssets}          
          manageAccount={this.manageAccount}
          showUsers={this.showUsers}
          isAdmin={localStorage.isAdmin}
          logout={this.logout}/>
      </div>
    );
  }
  displayAssets() {
   localStorage.setItem("userInQuestion", localStorage.getItem("username"));
    browserHistory.push('/assets');
  }
 
  showUsers() {   
    browserHistory.push('/users');
  }
  manageAccount() {
   localStorage.setItem("userInQuestion", localStorage.getItem("username"));
    browserHistory.push('/updateuser');
  }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    localStorage.removeItem("assets");
    localStorage.removeItem("userInQuestion");
    localStorage.removeItem("users");
    browserHistory.push('/login');
  }

}

Dashboard.propTypes = {

  errorMessage: PropTypes.string
}
