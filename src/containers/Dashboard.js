// components/Dashboard.js

import React, {Component, PropTypes} from 'react'
import DashboardWidget from '../components/DashboardWidget'

import {browserHistory} from 'react-router';

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
        <div className="asset-title">
          User&nbsp;{username}&nbsp;Dashboard
        </div>
        {errorMessage}
        <DashboardWidget
          displayAssets={this.displayAssets}
          manageAssets={this.manageAssets}
          manageAccount={this.manageAccount}
          logout={this.logout}/>
      </div>
    );
  }
  displayAssets() {
    console.log("displayAssets");
    browserHistory.push('/assets');
  }
  manageAssets() {
    console.log("manageAssets");
  }
  manageAccount() {
    console.log("manageAccount");
    browserHistory.push('/updateuser');
  }
  logout() {
    console.log("logout");
    localStorage.removeItem("id_token");
    localStorage.removeItem("isAuthenticated")
    browserHistory.push('/login');
  }

}

Dashboard.propTypes = {

  errorMessage: PropTypes.string
}
