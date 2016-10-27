import React, { PropTypes, Component } from 'react';

//import loginUser from '../middleware/LoginActions'
import Login from '../components/Login';


class LoginContainer extends Component {
    //handleLogin=creds => loginUser

    render() {
        return ( <div >
            <
            Login loginUser={ loginUser }
            errorMessage={ this.props.errorMessage }
            />

            </div>
        );
    }
}

function loginUser(creds) {
    console.log("LoginContainer.loginUser. ");

    let config={
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${creds.username}&password=${creds.password}`
    };

    return dispatch => {

        return fetch('http://localhost:3001/api/sessions/create', config)
            .then(response =>

                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) => {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    console.log("user.message: " + user.message);

                    return Promise.reject(user);
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('id_token', user.id_token);
                    // Dispatch the success action

                }
            }).catch(err => console.log("ZoMG! Error: ", err));
    };
}


LoginContainer.propTypes={
    errorMessage: PropTypes.string,

};


export default LoginContainer;