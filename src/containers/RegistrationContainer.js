import React, {PropTypes, Component} from 'react';
//import auth from '../middleware/auth';
import { browserHistory } from 'react-router';

import Registration from '../components/Registration';

class RegistrationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        };

    }
    render() {
        console.log(this.state.errorMessage);
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
        
        return fetch("http://localhost:3001/users", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {
                    console.log("json.errorMessage " + json.errorMessage);                    
                    throw new Error(json.errorMessage);
                    
                }                

                if (json.id_token) {
                    console.log("token: " + (json.id_token));
                };
                //localStorage.setItem({id_token: json.id_token}); this to be done by clicking 'confirm' link
                //                                                 in the email rather.

                browserHistory.push('/confirmationPending');
                return json;
            });
            //.catch(response => response, error => error);

    }
}

RegistrationContainer.propTypes = {
    errorMessage: PropTypes.string
};
export default RegistrationContainer;