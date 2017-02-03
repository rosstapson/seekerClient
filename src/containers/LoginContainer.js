import React, {PropTypes, Component} from 'react';
import { browserHistory } from 'react-router';

import Login from '../components/Login';

class LoginContainer extends Component {
    
    render() {
        return (
            <div >
                <Login loginUser={loginUser} errorMessage={this.props.errorMessage}/>

            </div>
        );
    }
}

function loginUser(creds) {    

    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${creds.username}&password=${creds.password}`
    };

    return fetch('https://seekerdnasecure.co.za:3002/sessions/create', config)
        .then(response => response.json().then(json => ({json, response})))
        .then(({json, response}) => {
            if (!response.ok) {
                // If there was a problem, we want to dispatch the error condition
                console.log("user.message: " + json.errorMessage);

                throw new Error(json.errorMessage);
            } else {
                // If login was successful, set the token in local storage
                // and go to dashboard
                localStorage.setItem ('username', json.username);
                console.log("token: " + json.id_token);
                localStorage.setItem('id_token', json.id_token);
                if (json.accessLevel === 2) {                    
                    localStorage.setItem('isAdmin', true);
                }
                if (json.accessLevel < 2) {                    
                    localStorage.removeItem('isAdmin');
                }
                localStorage.setItem('isAuthenticated',  true);
                browserHistory.push('/dashboard');

            }
            
            return;
        })
        //.catch(err => console.log("ZoMG! Error: ", err));

}

LoginContainer.propTypes = {
    errorMessage: PropTypes.string
};

export default LoginContainer;