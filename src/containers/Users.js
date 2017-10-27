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
    let config = {};

    if (localStorage.getItem('isAdmin')) {
      let company = localStorage.getItem('company'); 
      apiEndpoint = '/usersByCompany';
      config = {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'x-access-token' : localStorage.getItem('id_token')
        },
        body: JSON.stringify({company})
        //body: localStorage.getItem('company')
      }
    }
    if (localStorage.getItem('isDnaAdmin')) {      
      apiEndpoint = '/usersByCountry';
      let country = localStorage.getItem('country');
      config = {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'x-access-token' : localStorage.getItem('id_token')
        },
        //body: localStorage.getItem('country') //shouldn't need to JSON.stringify()  this??? :|
        body: JSON.stringify({country})
      }
    }
    
    if (localStorage.getItem('isGod')) {
      
      apiEndpoint = '/users';
      config = {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'x-access-token' : localStorage.getItem('id_token')        
        }
      }
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
