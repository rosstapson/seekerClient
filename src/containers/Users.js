import React, {
  Component,
  /*PropTypes*/
} from 'react'
import UserList from '../components/UserList';
import { API_ROOT } from '../apiConfig';

import {browserHistory} from 'react-router';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddUser: false,
      showUpdate: false,
      userToView: null,
      pendingAddUser: false,
      pendingUpdateUser: false,
      pendingDeleteUser: false,
      pendingViewUser: false
    };
  }
  
  getUsers() {
    let apiEndpoint = '';
    let config = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'x-access-token' : localStorage.getItem('id_token')        
      }
    }
    if (localStorage.getItem('isDnaAdmin')) {
      apiEndpoint = '/usersByCountry';
      //set config
    }
    if (localStorage.getItem('isAdmin')) {
      apiEndpoint = '/usersByCompany';
      //set config
    }
    if (localStorage.getItem('isGod')) {
      apiEndpoint = '/users';
    }
    
    
    
    return fetch(API_ROOT + apiEndpoint, config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {          
          browserHistory.push("/error");
        }
        
        localStorage.setItem('users', JSON.stringify(json.users));
        
        return json.assets; //this should be json.users, but it's a typo on the server component
      });

  }
  
  
  render() {
    return (
      <div>
        <div className="asset-title">
          Users
        </div>
        <div>
          <UserList
            promise={this.getUsers()}
            />

        </div>
      </div>
    )
  }

}
