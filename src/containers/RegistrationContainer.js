import React, {PropTypes, Component} from 'react';
//import auth from '../middleware/auth';
import { browserHistory } from 'react-router';

import Registration from '../components/Registration';
import { API_ROOT } from '../apiConfig';

class RegistrationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        };

    }
    render() {        
        return (
            <div >
                <Registration addUser={this.addUser} errorMessage={this.state.errorMessage}/>
            </div>
        );
    }
    addUser(user) {        
        let config = {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        
        return fetch(API_ROOT + "/users", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                
                if (!response.ok) {                               
                    throw new Error(json.errorMessage);
                }
    
                browserHistory.push('/confirmationPending');
                return json;
            });

    }
}

RegistrationContainer.propTypes = {
    errorMessage: PropTypes.string
};
export default RegistrationContainer;