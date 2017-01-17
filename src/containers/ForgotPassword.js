import React, { Component } from 'react'

export default class ForgotPassword extends Component {

  render() {
   

    return (
      <div>
        <h2 className='form-title'> Password Reset </h2>
        <form>
         <div >
          <h2 className='form-label'>Email address:</h2>
          
        </div>
        <div>
        <input
              className='form-field'
              type="email"
              ref="email"
              id="email"
              placeholder="Email"/>
          
        </div>
        <button type="button" className="asset-submit-button" onClick={this.sendPasswordReset}>Submit</button>
        </form>
      </div>
    )
  }

  
}
