import React, { Component } from 'react';
import { Link } from 'react-router';

import logo from './logo.png';
import './App.css';


class App extends Component {
    render() {
        const isAuthenticated=this.props.isAuthenticated;
        return ( <div className="App" >
            <div className="App-header" >
            <img src={ logo }
            className="App-logo"
            alt="logo" / >

            </div> <p className="App-intro" >
            To get started, edit <code > src / App.js </code> and save to reload.

            Links:
            <li > < Link to="/registration" > Register </Link> </li > {!isAuthenticated &&
                <li> < Link to="/login" > Log In </Link></li>
            } {
                isAuthenticated &&
                    <li > < Link to="/dashboard" > Dashboard </Link></li >
            }
            Children appear below:

            </p> { this.props.children } 
            </div>
        );
    }
}

export default App;