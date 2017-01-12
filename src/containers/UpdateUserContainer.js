import React, {PropTypes, Component} from 'react';
//import auth from '../middleware/auth';
import { browserHistory } from 'react-router';

import UpdateUser from '../components/UpdateUser';

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
      this.getUserDetails(localStorage.getItem('username'))
        .then(function(user) {
          _this.setState({userToUpdate: user, isFetchingUserDetails: false});
        });
    }
    render() {
        console.log(this.state.errorMessage);
        if (this.state.isFetchingUserDetails) {         
          return(<div className="loader">Fetching User Details...</div>);
        } 
        else {
          return (          
              <div>            
                  <UpdateUser updateUser={this.updateUser} userDetails={this.state.userToUpdate} errorMessage={this.state.errorMessage}/>
              </div>          
          );
        }
    }
    getUserDetails(username) {
      this.setState({isFetchingUserDetails: true});
        //console.log(JSON.stringify(user));
        let config = {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({username})
        }
        
        return fetch("http://seekerdnasecure.co.za:3001/userdetails", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {
                    console.log("json.errorMessage " + json.errorMessage);                    
                    alert(json.errorMessage);
                    
                }                

                
               
                return json;
            });
            //.catch(response => response, error => error);

    
    }
    updateUser(user) {
        //console.log(JSON.stringify(user));
        let config = {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        
        return fetch("http://seekerdnasecure.co.za:3001/updateuser", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {
                    console.log("json.errorMessage " + json.errorMessage);                    
                    throw new Error(json.errorMessage);
                    
                }             

               
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