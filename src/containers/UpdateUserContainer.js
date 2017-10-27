import React, {PropTypes, Component} from 'react';
//import auth from '../middleware/auth';
import {browserHistory} from 'react-router';

import { API_ROOT } from '../apiConfig';
import UserWidget from '../components/UserWidget';

class UpdateUserContainer extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            errorMessage: null,
            userToUpdate: null,
            isFetchingUserDetails: true
        };

    }
    componentWillMount() {
        var _this = this;
        
        this
            .getUserDetails(localStorage.getItem('userInQuestion'))
            .then(function (user) {
                _this.setState({userToUpdate: user, isFetchingUserDetails: false});
            });
    }
    render() {       
        if (this.state.isFetchingUserDetails) {
            return (
                <div className="loader">Fetching User Details...</div>
            );
        } else {
            return (
                <div>
                    <UserWidget 
                        user={this.state.userToUpdate}
                        handleSubmit={this.updateUser}                       
                    />
                </div>
            )
        }        
    }
    getUserDetails(username) {
        this.setState({isFetchingUserDetails: true});        
        let config = {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'x-access-token': localStorage.getItem('id_token')
            },
            body: JSON.stringify({username})
        }

        return fetch(API_ROOT + "/userdetails", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {                  
                    alert(json.errorMessage);
                }

                return json;
            });
       

    }
    updateUser(user) {       
        let config = {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'x-access-token': localStorage.getItem('id_token')
            },
            body: JSON.stringify(user)
        }

        return fetch(API_ROOT + "/updateuser", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {
                   
                    throw new Error(json.errorMessage);

                }
                let tempName = localStorage.getItem("username");
                localStorage.setItem("userInQuestion", tempName);
                browserHistory.push('/dashboard');
                return json;
            });
        //.catch(response => response, error => error);

    }
}

UpdateUserContainer.propTypes = {
    errorMessage: PropTypes.string
};
export default UpdateUserContainer;