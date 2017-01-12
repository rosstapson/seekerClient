import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import Dashboard from './containers/Dashboard';
import RegistrationContainer from './containers/RegistrationContainer';
import LoginContainer from './containers/LoginContainer';
import ConfirmationPending from './containers/ConfirmationPending';
import Confirmation from './containers/Confirmation';
import Error from './containers/Error'
import Assets from './containers/Assets'
import Users from './containers/Users'
import UpdateUserContainer from './containers/UpdateUserContainer'
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route
      path="/registration"
      component={RegistrationContainer}
      history={browserHistory}/>
    <Route path="/confirmationPending" component={ConfirmationPending}/>
    <Route path="/confirm/:id_token" component={Confirmation}/>
    <Route path="/login" component={LoginContainer}/>
    <Route path="/dashboard" component={Dashboard} onEnter={ requireCredentials } username={ localStorage.username }/>
    <Route path="/assets" component={Assets} onEnter={ requireCredentials } username={ localStorage.username }/>
    <Route path="/users" component={Users} onEnter={requireCredentials } />
    <Route path="/updateuser" component={UpdateUserContainer} onEnter={ requireCredentials } username={ localStorage.username }/>
    <Route path="/error" component={Error} />
  </Route>
</Router>, document.getElementById('root'));

//temporarily...
/* eslint-disable */
function requireCredentials(nextState, replace, next) {  
  if (!localStorage.isAuthenticated || localStorage.isAuthenticated == false || !localStorage.getItem("id_token")) {
    console.log("not authenticated");
    replace('/login')    
  } 
  next()
}