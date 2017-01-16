// components/UserListItem.js

import React, {Component, /* PropTypes */} from 'react'



export default class UserListItem extends Component {

  handleView = () => {
    console.log("handleview");
    this.props.viewUser(this.props.user);
  };
  handleDelete = () => { 
    
    this.props.deleteUser(this.props.user.username);
  };
  render() {
    
    return (
      <tr onClick={this.handleOnClick} className="tr-highlight">
        <td className="td">{this.props.user.username}</td>
        <td className="td">{this.props.user.email} </td>
        <td className="td">{this.props.user.companyName} </td>
        <td className="td">{this.props.user.contactPerson} </td>
        
        <td><button className="asset-submit-button" onClick={this.handleView}>View/Update</button></td>
        <td><button className="asset-submit-button" onClick={this.handleDelete}>Delete</button></td>
      </tr>
    )
  }

}

