import React, { Component } from 'react';

import SelectCountry from './SelectCountry';

import './components.css';

export default class UserWidget extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            user: this.props.user,
            confirmEmail: this.props.user.email,
            isGod: localStorage.getItem('isGod')
        }
    }
    handleSubmit = () => {
        if (this.state.user.email !== this.state.confirmEmail) {
            alert("Emails don't match");
            return;
        }
        
        return this.props.handleSubmit(this.state.user);
    }
    handleChange = (event) => {
        let tempUser = {...this.state.user};
        tempUser[event.target.id] = event.target.value;
       
        this.setState({ user: tempUser });
    }
    handleAddressChange = (event) => {
        let user = {...this.state.user};
        user.address[event.target.id] = event.target.value;        
        this.setState({ user });
    }
    
    render() {        
       return(
           <div style={{
                display: 'flex',
                flex: '1',
                flexDirection: 'row',
                justifyContent: 'center'
           }}>
                <form>
                    <table 
                        className="table"
                        style={{}}
                        >
                        <tbody>
                            <tr>
                                <td>               
                                <div className="form-label">Username</div>                                
                                <br/>
                                    <input
                                        className="form-field"
                                        type="text"
                                        id="username"
                                        defaultValue={this.props.user.username}
                                        onChange={ this.handleChange }
                                    />
                                    </td>
                                    
                                    {this.state.isGod &&
                                        
                                            <td>
                                            <div className="form-label">Access Level </div>                                
                                            <br/>
                                            <select 
                                                className='form-field' 
                                                defaultValue={this.props.user.accessLevel}
                                                onChange={ this.handleChange }
                                                id='accessLevel'
                                                >
                                                <option value="0">Guest</option>
                                                <option value="1">User</option>
                                                <option value="2">Admin</option>
                                                <option value="3">SeekerDNA Admin</option>
                                                <option value="4">God</option>
                                            </select>
                                            </td>                            
                                        }
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-label">Email Address</div>
                                    <br />
                                    <input
                                    className="form-field"
                                    type="text"
                                    id="email"
                                    defaultValue={this.props.user.email}
                                    onChange={ this.handleChange }
                                />
                                </td>
                                <td>
                                <div className="form-label">Confirm Email</div>
                                <br />
                                <input
                                className="form-field"
                                type="text"
                                id="confirmEmail"
                                defaultValue={this.props.user.email}
                                onChange={ this.handleChange }
                            />
                            </td>
                            </tr>
                            
                            <tr>
                                <td>
                                <div className="form-label">Address</div>
                                <br />
                                <input
                                className="form-field"
                                type="text"
                                id="line1"
                                defaultValue={this.props.user.address.line1}
                                onChange={ this.handleAddressChange }
                            />
                            </td>
                            <td>
                                <div className="form-label">City</div>
                                <br />
                                <input
                                className="form-field"
                                type="text"
                                id="line2"
                                defaultValue={this.props.user.address.line2}
                                onChange={ this.handleAddressChange }
                            />
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <div className="form-label">Postal/State/Zip</div>
                            <br />
                            <input
                            className="form-field"
                            type="text"
                            id="line3"
                            defaultValue={this.props.user.address.line3}
                            onChange={ this.handleAddressChange }
                        />
                        </td>
                        <td>
                            <div className="form-label">State</div>
                            <br />
                            <input
                            className="form-field"
                            type="text"
                            id="state"
                            defaultValue={this.props.user.address.state}
                            onChange={ this.handleAddressChange }
                        />
                        </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                            <div className="form-label">Country</div>
                            <br />
                                <SelectCountry
                                    id="country"
                                    defaultValue={this.state.user.address.country}
                                    handleChange={this.handleAddressChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-label">Telephone</div>
                                <br/>
                                <input
                                    className="form-field"
                                    type="text"
                                    id="telephone"
                                    defaultValue={this.props.user.telephone}
                                    onChange={ this.handleChange } />
                            </td>
                            <td>
                                <div className="form-label">Mobile</div>
                                <br/>
                                <input
                                    className="form-field"
                                    type="text"
                                    id="mobile"
                                    defaultValue={this.props.user.mobile}
                                    onChange={ this.handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                            <div className="form-label">Complete for Business Accounts Only</div>
                            </td>
                        </tr>
                        <tr>
                        <td>
                            <div className="form-label">Company Name</div>
                            <br/>
                            <input
                                className="form-field"
                                type="text"
                                id="companyName"
                                defaultValue={this.props.user.companyName}
                                onChange={ this.handleChange } />
                            <div className="form-label">Division</div>
                            <br/>
                            <input
                                className="form-field"
                                type="text"
                                id="division"
                                defaultValue={this.props.user.division}
                                onChange={ this.handleChange } />
                       
                            <div className="form-label">Contact Person</div>
                            <br/>
                            <input
                                className="form-field"
                                type="text"
                                id="contactPerson"
                                defaultValue={this.props.user.contactPerson}
                                onChange={ this.handleChange } />
                        </td>
                    </tr>
                        </tbody>
                    </table>
                    <div>
                    <button type="button" className="asset-submit-button" onClick={this.handleSubmit}>Submit</button>            
                               
                  </div>
                </form>
           </div>

       )
    }
}