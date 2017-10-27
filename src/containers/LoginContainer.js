import React, {PropTypes, Component} from 'react';
import { browserHistory } from 'react-router';

import Login from '../components/Login';
import { API_ROOT } from '../apiConfig';

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

    return fetch(API_ROOT + '/sessions/create', config)
        .then(response => response.json().then(json => ({json, response})))
        .then(({json, response}) => {
            if (!response.ok) {
                

                throw new Error(json.errorMessage);
            } else {
                // If login was successful, set the token in local storage
                // and go to assets
                localStorage.setItem ('username', json.username);
                localStorage.setItem('userInQuestion', json.username);
               
                localStorage.setItem('id_token', json.id_token);
                if (json.accessLevel === 3) {                    
                    localStorage.setItem('isAdmin', true);
                }
                
                localStorage.setItem('country', json.country);
                localStorage.setItem('company', json.companyName);
                if (json.accessLevel === 4) {                    
                    localStorage.setItem('isAdmin', true);
                    localStorage.setItem('isGod', true);
                }
                if (json.accessLevel === 3) {
                    localStorage.setItem('isDnaAdmin', true);
                }
                if (json.accessLevel === 2) {
                    localStorage.setItem('isAdmin', true);
                }
                // 3 = dnaAdmin
                // 2 = admin
                // 1 = user
                if (json.accessLevel < 3) {                    
                    //localStorage.removeItem('isAdmin');
                    localStorage.removeItem('isGod');
                }
                // this just to be sure - some oddities on logout/login
                if (json.accessLevel < 2) {
                    localStorage.removeItem('isAdmin');
                }
                localStorage.setItem('isAuthenticated',  true);
                browserHistory.push({pathname: '/assets', state: {showAddAsset: false}});

            }
            
            return;
        })       

}

LoginContainer.propTypes = {
    errorMessage: PropTypes.string
};

export default LoginContainer;