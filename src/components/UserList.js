import React, {Component} from 'react'
import './components.css'
import UserListItem from './UserListItem'

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
    this.state = {
      loading: true,
      error: null,
      users: null,
      filterField: 'description', 
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
    //console.log(this.state.filterField + ":" + event.target.value);
    
  }
  handleFilterFieldChange(event) {
    this.setState({filterField: event.target.value});    
  }
  customFilter(user, arg) {
    //var tempFilterBy = this.state.filterBy;
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
            <option value="contactPerson">Contact Person</option>
            
          </select>
        </div><div>
        <table className="table">
        <tbody>
        <tr>
        <td className="column-name">Username</td>
        <td className="column-name">Email</td>
        <td className="column-name">Company Name</td>
        <td className="column-name">Contact Person</td>        
        </tr>
          {this.state.filterBy && 
              this.state.filteredUsers.map(user => <UserListItem
              key={user.username}
              user={user}
              viewUser={this.props.viewUser}
              deleteUser={this.props.deleteUser} />)
          }
          {!this.state.filterBy &&
            this.state.users.map(user => <UserListItem
              key={user.username}
              user={user}
              viewUser={this.props.viewUser}
              deleteUser={this.props.deleteUser} />)
          }
        </tbody>
        </table></div></div>
      )

    }
  }
}