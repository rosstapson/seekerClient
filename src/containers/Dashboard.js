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
          manageAssets={this.manageAssets}
          manageAccount={this.manageAccount}
          showUsers={this.showUsers}
          isAdmin={localStorage.isAdmin}
          logout={this.logout}/>
      </div>
    );
  }
  displayAssets() {
   
    browserHistory.push('/assets');
  }
  manageAssets() {
    console.log("manageAssets");
  }
  showUsers() {
   
    browserHistory.push('/users');
  }
  manageAccount() {
   
    browserHistory.push('/updateuser');
  }
  logout() {
    //console.log("logout");
    localStorage.removeItem("id_token");
    localStorage.removeItem("isAuthenticated")
    browserHistory.push('/login');
  }

}

Dashboard.propTypes = {

  errorMessage: PropTypes.string
}
