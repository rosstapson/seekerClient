import React, { Component } from 'react'

export default class ResetPassword extends Component {

  render() {
   

    return (
      <div>
        <h2 className='form-title'> Reset Password </h2>
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
        <button type="button" className="asset-submit-button" onClick={this.resetPassword}>Submit</button>
        </form>
      </div>
    )
  }

  
}
