import React, {Component, PropTypes} from 'react';
//import ErrorMessage from './ErrorMessage';
import './components.css';

export class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isInError: false,
      errorMessage: ""
    };
  }
  addUser = () => {

    const userNameRef = this.refs.userName;
    const emailRef = this.refs.email;
    const emailConfirmRef = this.refs.emailConfirm;
    const passwordRef = this.refs.password;
    const passwordConfirmRef = this.refs.passwordConfirm;
    const companyNameRef = this.refs.companyName;

    const addressLine1Ref = this.refs.addressline1;
    const addressLine2Ref = this.refs.addressline2;
    const addressLine3Ref = this.refs.addressline3;
    const addressStateRef = this.refs.addressState;
    const addressCountryRef = this.refs.addressCountry;
    const telephoneRef = this.refs.telephone;
    const contactPersonRef = this.refs.contactPerson;

    if (this.refs.userName.value && this.refs.email.value && this.refs.password.value) {
      if (this.refs.email.value === this.refs.emailConfirm.value) {
        if (this.refs.password.value === this.refs.passwordConfirm.value) {
          const user = {
            username: userNameRef
              .value
              .trim(),
            password: passwordRef
              .value
              .trim(),
            email: emailRef
              .value
              .trim(),
            companyName: companyNameRef
              .value
              .trim(),

            address: {
              line1: addressLine1Ref
                .value
                .trim(),
              line2: addressLine2Ref
                .value
                .trim(),
              line3: addressLine3Ref
                .value
                .trim(),
              state: addressStateRef
                .value
                .trim(),
              country: addressCountryRef
                .value
                .trim(),
            },
            telephone: telephoneRef
              .value
              .trim(),
            contactPerson: contactPersonRef
              .value
              .trim()
          }

          let self = this;
          this
            .props
            .addUser(user)
            .then(function () { //adduser returns a promise. shouldn't.
              //console.log("here.");
              if (!self.props.errorMessage) {
                userNameRef.value = emailRef.value = emailConfirmRef.value = passwordRef.value = passwordConfirmRef.value = companyNameRef.value = telephoneRef.value = contactPersonRef.value = addressLine1Ref.value = addressLine2Ref.value = addressLine3Ref.value = addressStateRef.value = addressCountryRef.value = '';
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

          return;
        } else {
          alert("Passwords don't match");
          return;
        }
      }
      alert("Emails don't match");
      return;
    }
    alert("Please fill out essential fields");

  };

  render() {

    return (
      <form>
        <div >
          <h2 className='form-title'>New Account Registration</h2>
          
          <div>
            <label className="form-label" htmlFor="userName">User name</label>
            <input
              className='form-field'
              type="text"
              ref="userName"
              id="userName"
              placeholder="Username must be minimum 8 alphanumeric characters."/>

          </div>
          <div>
            <label className="form-label" htmlFor="email">Email address:</label>
            <input
              className='form-field'
              type="email"
              placeholder="We'll never share your email with anyone else."
              ref="email"
              id="email"/>
            <input
              className='form-field'
              type="email"
              placeholder="Confirm Email"
              ref="emailConfirm"/>

          </div>

          <div>
            <label className="form-label" htmlFor="password">Password:
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
          <div className="form-group">
            <label className="form-label" htmlFor="companyName">Company Name:</label>
            <input
              className='form-field'
              type="text"
              placeholder="Company name"
              ref="companyName"
              id="companyName"/>
            <label className="form-label" htmlFor="addressline1">Address:</label>
            <input
              className='form-field'
              type="text"
              placeholder="Line 1"
              ref="addressline1"
              id="addressline1"/>
            <input
              className='form-field'
              type="text"
              placeholder="Line 2"
              ref="addressline2"/>
            <input
              className='form-field'
              type="text"
              placeholder="Line 3"
              ref="addressline3"/>
            <label className="form-label" htmlFor="addressState">State:</label>
            <input
              className='form-field'
              type="text"
              placeholder="State"
              ref="addressState"/>
            <label className="form-label" htmlFor="addressCountry">Country:</label>
            <input
              className='form-field'
              type="text"
              placeholder="Country"
              ref="addressCountry"
              id="addressCountry"/>
            <label className="form-label" htmlFor="telephone">Company Telephone:</label>
            <input
              className='form-field'
              type="tel"
              placeholder="Telephone"
              ref="telephone"/>
            <label className="form-label" htmlFor="contactPerson">Contact Person</label>
            <input
              className='form-field'
              type="text"
              placeholder="Contact Person"
              ref="contactPerson"
              id="contactPerson"/>
            <button type="button" className="submit-button" onClick={this.addUser}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

Registration.propTypes = {
  errorMessage: PropTypes.string,
  errorHeading: PropTypes.string,
  addUser: PropTypes.func.isRequired
};

export default Registration