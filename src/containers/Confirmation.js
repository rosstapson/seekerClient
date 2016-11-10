// components/Confirmation.js
/* eslint-disable */
import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import auth from '../middleware/auth'

export default class Confirmation extends Component {
  componentWillMount() {
    
    localStorage.setItem("isAuthenticated", false);

    auth(this.props.params.id_token).then(function () {
      console.log("good");
      localStorage.setItem("isAuthenticated", true);
    }, function (err) {
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("errorMessage", err.message);
      console.log("not good: " + err.message);
      browserHistory.push("/error");
    });
    
  }

  render() {

    return (
      <div>
        <h2>
          Confirmation
        </h2>
        Hvala ti, gospodin.
        <Link to="/login">
          Login.
        </Link>

      </div>
    )
  }
}
