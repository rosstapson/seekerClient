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
        'content-type': 'application/json'
      }
    }
    return fetch("http://seekerdnasecure.co.za:3001/users", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          console.log("!response.ok");
          browserHistory.push("/error");
        }
        
        localStorage.setItem('users', JSON.stringify(json.users));
        return json.assets;
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
