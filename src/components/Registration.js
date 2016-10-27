import React, { Component, PropTypes } from 'react';



export class Registration extends Component {
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


   console.log("ZOMG!");
    
    

   if (this.refs.userName.value && this.refs.email.value && this.refs.password.value) {
      if (this.refs.email.value === this.refs.emailConfirm.value) {
        if (this.refs.password.value === this.refs.passwordConfirm.value) {
        const user = { 
          username: userNameRef.value.trim(),
          password: passwordRef.value.trim(),          
          email: emailRef.value.trim(),
          companyName: companyNameRef.value.trim(),
         
          addressline1: addressLine1Ref.value.trim(),
          addressline2: addressLine2Ref.value.trim(),
          addressline3: addressLine3Ref.value.trim(),
          addressState: addressStateRef.value.trim(),
          addressCountry: addressCountryRef.value.trim(),
          telephone: telephoneRef.value.trim(),
          contactPerson: contactPersonRef.value.trim(),
        }
        this.props.addUser(user); 
        
        userNameRef.value = 
        emailRef.value = 
        emailConfirmRef.value =
        passwordRef.value =
        passwordConfirmRef.value = 
        companyNameRef.value =
        telephoneRef.value =         
        contactPersonRef.value =          
        addressLine1Ref.value =
        addressLine2Ref.value =
        addressLine3Ref.value =
        addressStateRef.value =
        addressCountryRef.value = '';
          
        return;
        }
        else {
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
          <h2>New Account Registration</h2>
          { this.props.errorMessage &&
          <div>{ this.props.errorMessage }</div>
          }
          <div className="form-group">
            <label htmlFor="userName">User name</label>
            <input type="text" ref="userName" id="userName" aria-describedby="emailHelp" placeholder="Enter Username"/>
            <small id="userNameHelp" className="form-text text-muted">Username must be minimum 8 alphanumeric characters.</small>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="email" placeholder="Enter email" ref="email" id="email" aria-describedby="emailHelp"/>
            <input type="email" placeholder="Confirm Email" ref="emailConfirm" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
         
          
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" placeholder="Enter password" ref="password" id="password" aria-describedby="passwordHelp"/>
            <input type="password" placeholder="Confirm password" ref="passwordConfirm" />
            <small id="passwordHelp" className="form-text text-muted">Password must be 8 digits, 1 uppercase letter, 1 special character.</small>
          </div>
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input type="text" placeholder="Company name"  ref="companyName" id="companyName" />
            <label htmlFor="addressline1">Address:</label>
            <input type="text" placeholder="" ref="addressline1" id="addressline1"/>
            <input type="text" placeholder="" ref="addressline2" />
            <input type="text" placeholder="" ref="addressline3" />
            <label htmlFor="addressState">State:</label>
            <input type="text" placeholder="" ref="addressState" />
            <label htmlFor="addressCountry">Country:</label>
            <input type="text" placeholder="Country" ref="addressCountry" id="addressCountry" />  
            <label htmlFor="telephone">Company Telephone:</label>
            <input type="tel" placeholder="Telephone" ref="telephone" />    
            <label htmlFor="contactPerson">Contact Person</label>    
            <input type="text" placeholder="Contact Person" ref="contactPerson" id="contactPerson"/>
            <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={this.addUser}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

Registration.propTypes = {
  errorMessage : PropTypes.string,
  addUser: PropTypes.func.isRequired
};

export default Registration