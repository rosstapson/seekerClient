import React, {Component} from 'react'

export default class ResetPassword extends Component {
  resetPassword = () => {
    const passwordConfirmRef = this.refs.passwordConfirm;
    const passwordRef = this.refs.password;
    if (this.refs.passwordConfrm.value && this.refs.password.value) {
      if (this.refs.passwordConfrm.value === this.refs.password.value) {
        const user = {
          username: localStorage
            .getItem("decodedName")
            .value
            .trim(),
          password: passwordRef
            .value
            .trim()
        }
        doReset(user);
      }
    } // 'else' validations and alerts etc etc
  }
  doReset(user) {
    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }

    return fetch("http://seekerdnasecure.co.za:3001/resetpassword", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          alert(json.errorMessage);
          throw new Error(json.errorMessage);
        }
        browserHistory.push('/dashboard');
        return json;
      });
    //.catch(response => response, error => error);
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
