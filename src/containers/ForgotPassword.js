import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { API_ROOT } from '../apiConfig';

export default class ForgotPassword extends Component {
   sendPasswordReset = () => {
    const usernameRef = this.refs.username.value.trim();    
    if (!usernameRef || usernameRef ==='') {
      alert("Please enter a valid username");
      return;
    }
    let config = {
            method: 'post',
             headers: {
        'content-type': 'application/json'
      },
            body: JSON.stringify({username: usernameRef})
    }
    return fetch(API_ROOT + "/mailpasswordreset", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {
                    alert(json.errorMessage);
                    return;                   
                }
                browserHistory.push('/resetMailSent');
                return json;
            });
            
}
  render() {
    return (
      <div>
        <h2 className='form-title'> Password Reset </h2>
        <form>
         <div >
          <h2 className='form-label'>Username:</h2>
          
        </div>
        <div>
        <input
              className='form-field'
              type="text"
              ref="username"
              id="username"
              placeholder="Username"/>
          
        </div>
        <button type="button" className="asset-submit-button" onClick={this.sendPasswordReset}>Submit</button>
        </form>
      </div>
    )
  }  
}


