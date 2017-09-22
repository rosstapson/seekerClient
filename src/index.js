import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
//import jwt from 'jsonwebtoken';
import App from './App';
import Dashboard from './containers/Dashboard';
import RegistrationContainer from './containers/RegistrationContainer';
import LoginContainer from './containers/LoginContainer';
import ConfirmationPending from './containers/ConfirmationPending';
import Confirmation from './containers/Confirmation';
import Error from './containers/Error'
import ForgotPassword from './containers/ForgotPassword';
import ResetMailSent from './containers/ResetMailSent';

import Assets from './containers/Assets';
import AddAsset from './containers/AddAsset';
import UpdateAssetContainer from './containers/UpdateAssetContainer';
import Users from './containers/Users';
import Images from './containers/Images';
import UpdateUserContainer from './containers/UpdateUserContainer';
import PinsContainer from './containers/PinsContainer';
import AddPinsContainer from './containers/AddPinsContainer';

import './index.css';
import { API_ROOT } from './apiConfig';

ReactDOM.render(
  <Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="/registration" component={RegistrationContainer} history={browserHistory}/>
    <Route path="/confirmationPending" component={ConfirmationPending}/>
    <Route path="/confirm/:id_token" component={Confirmation}/>
    <Route path="/login" component={LoginContainer}/>
    <Route path="/dashboard" component={Dashboard} onEnter={ verifyCredentials } username={ localStorage.username }/>
    <Route path="/assets" component={Assets} onEnter={ verifyCredentials } username={ localStorage.username }/>
    <Route path="/images" component={Images} onEnter={requireCredentials} />
    <Route path="/addAsset" component={AddAsset} onEnter={ requireCredentials } />
    <Route path="/updateAsset" component={ UpdateAssetContainer } onEnter={requireCredentials} />
    <Route path="/users" component={Users} onEnter={requireCredentials } />
    <Route path="/updateuser" component={UpdateUserContainer} onEnter={ requireCredentials } username={ localStorage.username }/>
    <Route path="/forgotpassword" component={ForgotPassword} />
    <Route path="/resetMailSent" component={ResetMailSent} />
    <Route path="/pins" components={PinsContainer} onEnter={requireCredentials} />
    <Route path="/addpins" components={AddPinsContainer} onEnter={requireCredentials} />
    <Route path="/error" component={Error} />
  </Route>
</Router>, document.getElementById('root'));

//temporarily...
/* eslint-disable */
function requireCredentials(nextState, replace, next) {  
  if (!localStorage.isAuthenticated || localStorage.isAuthenticated == false || !localStorage.getItem("id_token")) {
    replace('/login')    
  } 
  next()
}
function verifyCredentials(nextState, replace, next) {  
  if (localStorage.getItem("id_token")) {
    let response = fetch(API_ROOT + '/token', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_token: localStorage.getItem("id_token")})
      })
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        
        if (response.status >= 200 && response.status < 300) {
          next();
        }
        else {
          
          // localStorage.setItem("id_token", "");
          // localStorage.setItem('isAuthenticated',  false);
          localStorage.removeItem("id_token");
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("isAdmin");
          localStorage.removeItem("username");
          localStorage.removeItem("assets");
          localStorage.removeItem("userInQuestion");
          localStorage.removeItem("users");
          //browserHistory.push('/login');
          replace("/login");
          next();
        }
      });
      
  }
  
}

// function requireToken(nextState, replace, next) {  
//   if (!localStorage.getItem("id_token") && !nextState.params.id_token) {
//     //console.log("no token");
//     replace('/login')    
//   }
  
//   next()
// }