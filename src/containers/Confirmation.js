// components/Confirmation.js
/* eslint-disable */
import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import auth from '../middleware/auth'

export default class Confirmation extends Component {
  componentWillMount() {

    localStorage.setItem("isAuthenticated", false);

    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({id_token: this.props.params.id_token})
    }
    fetch("http://seekerdnasecure.co.za:3001/token", config).then(function () {
      console.log("good");
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
