import React, {
  Component,
  /*PropTypes*/
} from 'react'
import UserList from '../components/UserList'

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
    
    let config = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'x-access-token' : localStorage.getItem('id_token')
      }
    }
    
    return fetch("https://seekerdnasecure.co.za:3002/users", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {          
          browserHistory.push("/error");
        }
        
        localStorage.setItem('users', JSON.stringify(json.users));
        
        return json.assets; //this should be json.users, but it's a typo on the server component
      });

  }
  viewUser() {}
  deleteUser() {}
  
  render() {
    return (
      <div>
        <div className="asset-title">
          Users
        </div>
        <div>
          <UserList
            promise={this.getUsers()}
            viewUser={this.viewUser}
            deleteUser={this.deleteUser}/>

        </div>
      </div>
    )
  }

}
