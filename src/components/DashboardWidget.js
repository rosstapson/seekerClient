// components/DashboardWidget.js

import React, { Component, PropTypes  } from 'react'

import './components.css';
import assets from './icons/assets.png';
import profile from './icons/profile.png';
import users from './icons/users.png';
import logout from './icons/logout.jpeg';
import addAsset from './icons/addAsset.jpeg';
import viewPins from './icons/vpins.png';
//import addPin from './icons/addpin.png';
import uploadXL from './icons/upxls.png';

export default class DashboardWidget extends Component {

  render() {
    //const { errorMessage } = this.props.errorMessage;
    //console.log("still admin? " + this.props.isAdmin);
    return (
      <div style={{ 
          backgroundColor: '#ffffff', 
          marginLeft: '80px', 
          marginRight: '80px',
          marginBottom: '40px',
          marginTop: '40px',
          border: 'solid', 
          borderColor: '#2b7485', 
          padding: '5px', 
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignContent: 'space-between',
          boxShadow : '10px 10px 10px  #808080'
        }}>
        <div style={{ 
          flex: 1,
          display: 'flex',   
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
         
          }}>
          
            <button className="widget-button" onClick={ this.props.displayAssets }> <img src={assets} alt="Assets" /><br/>Assets</button> 
            <button className="widget-button" onClick={ this.props.goToAddAsset }> <img src={addAsset} alt="Add Asset" /><br/>Add Asset</button> 
            <button className="widget-button" onClick={ this.props.manageAccount } ><img src={profile} alt="Profile" /><br/>Profile</button>     
            {this.props.isAdmin &&
              <button className="widget-button" onClick={ this.props.showUsers } ><img src={users} alt="Users" /><br/>Users</button>              
            }
            {this.props.isGod &&
              <button className="widget-button" onClick={ this.props.showPins }><img src={viewPins} alt="View Pins" /><br/>View Pins</button>
            }
            {this.props.isGod &&
              <button className="widget-button" onClick={ this.props.addPins }><img src={uploadXL} alt="Add Pins"/><br/>Add Pins</button>
            }
            <button className="widget-button" onClick={ this.props.logout } ><img src={logout} alt="Secure Logout" /><br/>Logout</button>
          </div>
          <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          paddingRight: '20px',           
          }}>
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: '20px', 
          
          }}>
        <h2 className="asset-title" >
        User: 
        </h2>
        </div>
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          paddingRight: '20px',
          
          }}>
        <h2  className="asset-title">
         {localStorage.getItem("username")}
         </h2>
         </div>
         
        </div>   
      </div>
    )
  }

  
}

DashboardWidget.propTypes = {  
  displayAssets: PropTypes.func,
  manageAssets: PropTypes.func,
  manageAccount: PropTypes.func,
  logout: PropTypes.func
}
