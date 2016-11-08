import React, {Component} from 'react';
import {Link} from 'react-router';

import logo from './logo.png';
import './App.css';

class App extends Component {
    render() {
        const isAuthenticated = this.props.isAuthenticated;
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                </div>
                <p className="App-intro">
                    {!isAuthenticated && 
                        <li>
                        < Link to="/registration">
                            Register
                        </Link>
                    </li> 
                    }
                    {!isAuthenticated && 
                    <li> 
                        <Link to="/login" > 
                            Log In 
                        </Link>
                    </li>
                    }
                    {isAuthenticated && <li >
                        < Link to="/dashboard">
                            Dashboard
                        </Link>
                    </li >
                    }

                </p>
                {this.props.children}
            </div> 
        )} 
}
export default App;
                    