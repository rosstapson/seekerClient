import React, {Component} from 'react'
import {browserHistory} from 'react-router';
import './components.css'
import UserListItem from './UserListItem'
import UpdateUser from './UpdateUser';
import { API_ROOT } from '../apiConfig';

export default class UserList extends Component {

  constructor(props) {
    super(props);
    this.handleFilterByChange = this
      .handleFilterByChange
      .bind(this);
    this.handleFilterFieldChange = this
      .handleFilterFieldChange
      .bind(this);
    this.customFilter = this
      .customFilter
      .bind(this);
    this.viewUser = this
      .viewUser
      .bind(this);
    this.viewAssets = this
      .viewAssets
      .bind(this);
    this.updateUser = this
      .updateUser
      .bind(this);
    this.state = {
      loading: true,
      showUpdate: false,
      showAssets: false,
      userToUpdate: null,
      error: null,
      users: null,
      filterField: 'username', 
      filterBy: ''
    };
  }
  handleFilterByChange(event) {
    var tempFilterField = this.state.filterField;
    var tempUsers = this.state.users.filter(function(user) {
      
    var keys = Object.keys(user);
    for (var i = 0, len = keys.length; i < len; i++) {
      if (keys[i] === tempFilterField) {
        if (user[keys[i]].includes(event.target.value)) {
          return true;
        }
      }
    }
    return false;
    });
    this.setState({
      filterBy: event.target.value,
      filteredUsers: tempUsers
    });    
    
  }
  handleFilterFieldChange(event) {
    this.setState({filterField: event.target.value});    
  }
  customFilter(user, arg) {    
    var tempFilterField = this.state.filterField;
    var keys = Object.keys(user);
    for (var i = 0, len = keys.length; i < len; i++) {
      if (keys[i] === tempFilterField) {
        if (user[keys[i]].includes(arg)) {
          return true;
        }
      }
    }
    return false;
  }
  viewUser(user) {
    //this.setState({userToUpdate: user, showUpdate: true});
    localStorage.setItem("userInQuestion", user.username);
    browserHistory.push('/updateuser');
  }
  viewAssets(user) {
    //this.setState({userToUpdate: user, showAssets: true});
    localStorage.setItem("userInQuestion", user.username);
    browserHistory.push("/assets");
  }
  
    updateUser(user) {        
        let config = {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                 'x-access-token' : localStorage.getItem('id_token')
            },
            body: JSON.stringify(user)
        }
        
        return fetch(API_ROOT + "/updateuser", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {                                       
                    throw new Error(json.errorMessage);                    
                }
                browserHistory.push('/dashboard');
                return json;
            });           

    }
  
  componentDidMount() {
    
    var self = this;
    this
      .props
      .promise
      .then(function (value) {
        
        self.setState({loading: false, users: value});
      }, function (error) {
        self.setState({loading: false, error: error});
      });
  }
  render() {
    
    if (this.state.loading) {      
      return <div  className="loader">Loading Users....</div>
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    } else if (this.state.showUpdate) {
      return (
        <div>            
          <UpdateUser updateUser={this.updateUser} userDetails={this.state.userToUpdate} errorMessage={this.state.errorMessage}/>
        </div> 
      )    
    } else {
      return (
        <div>
        <div className="inline-div">Search:</div>
        <div className="inline-div">
        <input
          type="text"
          value={this.state.filterBy}
          onChange={this.handleFilterByChange}/>
          </div>
        <div className="inline-div">
          <select
            className="select"
            value={this.state.filterField}
            onChange={this.handleFilterFieldChange}>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="companyName">Company Name</option>
            <option value="division">Division</option>
            
          </select>
        </div>
        <div style={{          
          display: 'flex',
          flex: '1',
          flexDirection: 'row',
          justifyContent: 'center'}}>
        <table className="table">
        <tbody>
        <tr>
        <td className="column-name">Username</td>
        <td className="column-name">Email</td>
        <td className="column-name">Company Name</td>
        <td className="column-name">Division</td>        
        </tr>
          {this.state.filterBy && 
              this.state.filteredUsers.map(user => <UserListItem
              key={user.username}
              user={user}
              viewUser={this.viewUser}
              viewAssets={this.viewAssets}
              deleteUser={this.props.deleteUser} />)
          }
          {!this.state.filterBy &&
            this.state.users.map(user => <UserListItem
              key={user.username}
              user={user}
              viewUser={this.viewUser}
              viewAssets={this.viewAssets}
              deleteUser={this.props.deleteUser} />)
          }
        </tbody>
        </table></div></div>
      )
    }
  }
}