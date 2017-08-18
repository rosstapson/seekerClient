import React, { Component  } from 'react'

import './components.css';

export default class TransferAssetWidget extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            buyerUsername: ''
        };
        this.setState = this
            .setState
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmitPressed = this
            .handleSubmitPressed
            .bind(this);
    }
    handleChange(event) {
        this.setState({buyerUsername: event.target.value});
        
    }
    handleSubmitPressed() {
        
        this.props.transferAsset(this.state.buyerUsername);
    }
    render() {
        return(
            <div>
               
                <div className="inline-div">
                <label className="form-label" htmlFor="buyerUsername">Username to transer asset to:</label>
              </div>
              <div>
                <input
                    className='form-field'
                    type="text"
                    ref="buyerUsername"
                    id="buyerUsername"
                    value={this.state.buyerUsername}
                    onChange={this.handleChange}
                    />
                </div>
                <div className="inline-div">
                <button className="asset-submit-button" onClick={this.handleSubmitPressed}>Submit</button>
              </div>
            </div>
        )
    }
}