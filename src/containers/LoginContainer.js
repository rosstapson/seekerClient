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
                if (json.accessLevel === 4) {
                    console.log("God mode!")
                    localStorage.setItem('isAdmin', true);
                    localStorage.setItem('isGod', true);
                }
                if (json.accessLevel < 3) {                    
                    localStorage.removeItem('isAdmin');
                    localStorage.removeItem('isGod');
                }
                localStorage.setItem('isAuthenticated',  true);
                browserHistory.push({pathname: '/assets', state: {showAddAsset: false}});

            }
            
            return;
        })
        //.catch(err => console.log("ZoMG! Error: ", err));

}

LoginContainer.propTypes = {
    errorMessage: PropTypes.string
};

export default LoginContainer;