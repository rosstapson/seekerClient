// components/Confirmation.js
/* eslint-disable */
import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import auth from '../middleware/auth';
import { API_ROOT } from '../apiConfig';

export default class Confirmation extends Component {
  componentWillMount() {

    localStorage.setItem("isAuthenticated", false);

    let config = {
      method: 'post',
       headers: {
        'content-type': 'application/json',
         'x-access-token' : localStorage.getItem('id_token')
      },
      body: JSON.stringify({id_token: this.props.params.id_token})
    }
    fetch(API_ROOT + "/token", config).then(function () {
      
      localStorage.setItem("isAuthenticated", true);
    }, function (err) {
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("errorMessage", err.message);      
      browserHistory.push("/error");
    });

  }

  render() {

    return (
      <div>
        <h2>
          Registration confirmed.
        </h2>
       
        <Link to="/login">
        <h3>  Login.</h3>
        </Link>

      </div>
    )
  }
}
