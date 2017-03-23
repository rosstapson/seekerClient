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
        //let bgStyle = {minHeight: "100%", minWidth: "100%"};
        
        
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
                     <div className="enjoy-css">
                     <button className="asset-submit-button" onClick={this.goToRegistration}>Register</button>
                     <button className="asset-submit-button" onClick={this.goToLogin}>Log In</button>
                     </div>
                }
               <div>
               
                   
                    {isAuthenticated && 
                        <div>
                        
                         <button className="asset-submit-button" onClick={this.goToDashboard}>Dashboard</button>
                         </div>
                    
                    }

                </div>
                {this.props.children}
            </div> 
        )} 
}
export default App;
                    