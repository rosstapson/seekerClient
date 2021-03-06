import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import logo from './logo.png';
//import geotrust from './geotrust.gif';
import './App.css';
import LoginContainer from './containers/LoginContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import DashboardWidget from './components/DashboardWidget';
//import Assets from './containers/Assets';

class App extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem("userInQuestion", localStorage.getItem("username"));
        this.state = {
            isInError: false,
            errorMessage: ""
        };
        this.setState = this
            .setState
            .bind(this);
        this.goToRegistration = this.goToRegistration.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.goToRoot = this.goToRoot.bind(this);
        this.goToDashboard = this.goToDashboard.bind(this);
        
    }
    componentWillMount() {
        let isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            this.setState({showButtons: false, showLogin: false});
        } else {
            this.setState({showButtons: true});
        }
    }
    goToRegistration() {
        //browserHistory.push("/registration");
        this.setState({showRegistration: true, showLogin: false, showButtons: false});
    }
    goToLogin() {
        //browserHistory.push("/login");
        this.setState({showRegistration: false, showLogin: true, showButtons: false});
    }
    goToDashboard() {
        this.setState({showRegistration: false, showLogin: false, showButtons: false});
        browserHistory.push("/dashboard");
    }
    goToRoot() {
        this.setState({showRegistration: false, showLogin: false, showButtons: true});
    }
    displayAssets() {
    localStorage.setItem("userInQuestion", localStorage.getItem("username"));
    browserHistory.push('/assets');
  }
 
  showUsers() {   
    browserHistory.push('/users');
  }
  manageAccount() {
    localStorage.setItem("userInQuestion", localStorage.getItem("username"));
    browserHistory.push('/updateuser');
  }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    localStorage.removeItem("assets");
    localStorage.removeItem("userInQuestion");
    localStorage.removeItem("users");
    browserHistory.push('/login');
  }
    render() {
        let isAuthenticated = localStorage.getItem('isAuthenticated');

        return (
            <div className="App">
                {isAuthenticated && <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
}
                {!isAuthenticated && <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={logo} className="App-logo-smaller" onClick={this.goToRoot} alt="logo"/>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
}
                {this.state.showButtons && !isAuthenticated && <div className="enjoy-css">
                <p className="blurb">Unique | Secure | Covert | Robust </p>
                    <button className="asset-submit-button" onClick={this.goToRegistration}>Register</button>
                    <button className="asset-submit-button" onClick={this.goToLogin}>Log In</button>
                </div>
}
                <div>

                    {isAuthenticated && <div>

                        <DashboardWidget
                            displayAssets={this.displayAssets}          
                            manageAccount={this.manageAccount}
                            showUsers={this.showUsers}
                            isAdmin={localStorage.isAdmin}
                            logout={this.logout}/>
                    </div>
}

                </div>
                {this.state.showLogin && !isAuthenticated && <LoginContainer/>
}
                {this.state.showRegistration && <RegistrationContainer/>
}   
                {this.props.children}            
            </div>
        )
    }
}
export default App;
