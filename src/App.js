import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import logo from './logo.png';
//import geotrust from './geotrust.gif';
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
        let bgStyle = {minHeight: "100%", minWidth: "100%"};
        return (
            <div className="App">
                {isAuthenticated &&
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </div>
                }
                {!isAuthenticated &&
                    <div>
                    <table>
                    <tr>
                    <td>
                        <img src={logo} className="App-logo-smaller" alt="logo"/> 
                    </td>          
                    
                    </tr>
                    </table>
                   </div>
                }
                {!isAuthenticated &&
                    <div>
                        <img src={"background.jpg"} alt="background" style={bgStyle} />
                    </div>
                }
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
                    