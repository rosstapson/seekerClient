import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import logo from './logo.png';
import './App.css';

class App extends Component {
    goToRegistration() {
        browserHistory.push("/registration");
    }
    goToLogin() {
        browserHistory.push("/login");
    }
    goToDashboard() {
        browserHistory.push("/dashboard");
    }
    render() {
        let isAuthenticated = localStorage.getItem('isAuthenticated');
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                </div>
                <p className="App-intro">
                    {!isAuthenticated && 
                        <button className="asset-submit-button" onClick={this.goToRegistration}>Register</button>
                    }
                    {!isAuthenticated && 
                    
                         <button className="asset-submit-button" onClick={this.goToLogin}>Log In</button>
                    
                    }
                    {isAuthenticated && 
                         <button className="asset-submit-button" onClick={this.goToDashboard}>Dashboard</button>
                    
                    }

                </p>
                {this.props.children}
            </div> 
        )} 
}
export default App;
                    