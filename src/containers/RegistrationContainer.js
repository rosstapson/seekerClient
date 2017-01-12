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
        //console.log(JSON.stringify(user));
        let config = {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        
        return fetch("http://seekerdnasecure.co.za:3001/users", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                
                if (!response.ok) {
                    console.log(json.errorMessage);                    
                    throw new Error(json.errorMessage);
                    
                }             

    
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