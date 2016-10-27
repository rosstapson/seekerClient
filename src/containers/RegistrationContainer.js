import React, { PropTypes, Component } from 'react';
import fetch from 'isomorphic-fetch';

import Registration from '../components/Registration';

class RegistrationContainer extends Component {
    constructor() {
        super();
        this.state = {
            errorMessage: null,
        };
    }
    render() {
        console.log(this.props.errorMessage);
        return ( 
          <div >
            <Registration addUser={ addUser } errorMessage={ this.props.errorMessage }/> 
          </div>
        );
    }
}

function addUser(user) {
    console.log("RegistrationContainer.addUser()");
    let config={
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${user.username}&password=${user.password}`
    };

    

        return fetch('http://localhost:3001/users', config)
            .then(response =>
                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) => {
                if (!response.ok) {
                    
                    //console.log("user.message: " + err);

                    return Promise.reject(user.errorMessage);
                } else {
                    // If login was successful, set the token in local storage
                    console.log('bingo!');
                    localStorage.setItem('id_token', user.id_token);
                    // Dispatch the success action


                }
            }).catch(err => {
                 console.log("ZoMG! Error: ", err.errorMessage);
                 // display errorMessage in Registration component
                 RegistrationContainer.setState({errorMessage: "balls"});
            });
    
    
}

RegistrationContainer.propTypes={
    errorMessage: PropTypes.string,
};
export default RegistrationContainer;