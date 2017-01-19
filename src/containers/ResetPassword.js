import React, {Component} from 'react'
import {browserHistory} from 'react-router'

export default class ResetPassword extends Component {
  resetPassword = () => {
    
    const passwordRef = this.refs.password;
    if (this.refs.passwordConfirm.value && this.refs.password.value) {
      if (this.refs.passwordConfirm.value === this.refs.password.value) {
           
        let config = {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            password: passwordRef.value.trim(),
            id_token: this.props.params.id_token
          })
        }

        return fetch("http://localhost:3001/resetpassword", config)
          .then(response => response.json().then(json => ({json, response})))
          .then(({json, response}) => {
            if (!response.ok) {
              alert(json.errorMessage);
              throw new Error(json.errorMessage);
            }
            browserHistory.push('/dashboard');
            return json;
          })
        .catch(response => response, error => error);
      }
    } // 'else' validations and alerts etc etc
  }

  render() {

    return (
      <div>
        <h2 className='form-title'>
          Reset Password
        </h2>
        <form>

          <div>
            <label className="form-label" htmlFor="password">Enter new Password:
            </label>
            <input
              className='form-field'
              type="password"
              placeholder="8 digits, 1 uppercase letter, 1 special character."
              ref="password"
              id="password"/>
            <input
              className='form-field'
              type="password"
              placeholder="Confirm password"
              ref="passwordConfirm"/>
          </div>
          <button
            type="button"
            className="asset-submit-button"
            onClick={this.resetPassword}>Submit</button>
        </form>
      </div>
    )
  }

}
