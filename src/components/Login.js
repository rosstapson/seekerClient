// components/Login.js

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router';
import './components.css';

export default class Login extends Component {
 constructor(props) {
    super(props);
    this.state = {
      isInError: false,
      errorMessage: ""
    };
  }
  forgotPassword = () => {
    browserHistory.push("/forgotpassword");
  }
  loginUser = () => {

    const userNameRef = this.refs.userName;    
    const passwordRef = this.refs.password;
    if (this.refs.userName.value && this.refs.password.value) {
      const user = {
            username: userNameRef
              .value
              .trim(),
            password: passwordRef
              .value
              .trim(),
      }      
      let self = this;
      this
            .props
            .loginUser(user)
            .then(function () {               
              if (!self.props.errorMessage) {
                userNameRef.value = passwordRef.value = '';
              }
            }, function (error) {              
              alert(error);         
              self.setState({
                errorMessage: error.message,
                isInError: true, 
                });             
            });
    }
    else {
      alert("Please provide username and password.");
    }
  }
  render() {  

    return (
      <div>
      <div>
      <form>
        <div >
          <h2 className='form-title'>Secure Asset Management Database</h2>
          <div>
          <h3 className='form-label'>Login</h3>

          </div>
        </div>
        { this.props.errorMessage && 
          <div>
          { this.props.errorMessage }
          </div>

        }
        <br /><hr /><br /><br />
        <div>
            
            <input
              className='form-field'
              type="text"
              ref="userName"
              id="userName"
              placeholder="Enter Username"
              style={{width: 300}} />
          </div>
          <br /><br />
          <div>
            
            <input
              className='form-field'
              type="password"
              placeholder="Enter Password"
              ref="password"
              id="password" 
              style={{width: 300}} />
            
          </div>
          <br /><br />
          <button type="button" className="asset-submit-button" onClick={this.loginUser}>Submit</button>
      </form>
      </div>
       <br /><hr /><br />
      
      <div><button type="button" className="asset-submit-button" onClick={this.forgotPassword}>Reset Password</button></div>
      <h2 className='form-title'>The use of this system is strictly reserved for registered clients of SeekerDNA Products.</h2>  

      </div>
      
        
     
    )
  }

}

 Login.propTypes = {  
   errorMessage: PropTypes.string,
   loginUser: PropTypes.func
 }
