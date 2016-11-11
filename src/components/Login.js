// components/Login.js

import React, {Component, PropTypes} from 'react'
import './components.css';

export default class Login extends Component {
 constructor(props) {
    super(props);
    this.state = {
      isInError: false,
      errorMessage: ""
    };
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
      console.log("here.");
      let self = this;
      this
            .props
            .loginUser(user)
            .then(function () { 
              //console.log("here.");
              if (!self.props.errorMessage) {
                userNameRef.value = passwordRef.value = '';
              }
            }, function (error) {
              //console.log("promise rejected:" + error.message);
              alert(error);         
              self.setState({
                errorMessage: error.message,
                isInError: true, 
                });
             // console.log("this.state.errorMessage:" + self);
            });
    }
    else {
      alert("Please provide username and password.");
    }
  }
  render() {
    //const { errorMessage } = this.props.errorMessage;
 

    return (
      <form>
        <div >
          <h2 className='form-title'>Login</h2>
        
        </div>
        { this.props.errorMessage && 
          <div>
          { this.props.errorMessage }
          </div>

        }
        <div>
            <label className="form-label" htmlFor="userName">Username:</label>
            <input
              className='form-field'
              type="text"
              ref="userName"
              id="userName"
              placeholder="Username"/>
          </div>
          <div>
            <label className="form-label" htmlFor="password">Password:
            </label>
            <input
              className='form-field'
              type="password"
              placeholder="Password"
              ref="password"
              id="password"/>
            
          </div>
          <button type="button" className="submit-button" onClick={this.loginUser}>Submit</button>
      </form>
    )
  }

}

 Login.propTypes = {  
   errorMessage: PropTypes.string,
   loginUser: PropTypes.func
 }
