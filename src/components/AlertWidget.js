import React, { Component } from 'react';

import './components.css';

export default class AlertWidget extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this
        .handleSubmit
        .bind(this);
        this.state = {
            asset: this.props.asset,
            incident: {}
        }
    }
    handleChange = (event) => {
        let incident = {...this.state.incident};
        incident[event.target.id] = event.target.value;
        this.setState({ incident });        
      }
    handleSubmit = () => {
        let asset = {...this.state.asset};
        let incident = {...this.state.incident};
        incident.dateReported = Date.now();
        incident.status = "Active";
        asset.status = "Alert";    
        asset.incidents.push(incident);   
        this.props.alertAsset(asset);
    }
    render() {
        return(
            <div
                style={{color: "black", backgroundColor: 'red', columnSpan: "2"}}>
            <h1>Alert for this Asset</h1>
            <div>
             <div className="form-label">
             Case Number
             </div>
             <input
                 className='form-field'
                 type="text"
                 id="caseNumber"
                 defaultValue={this.state.caseNumber}
                 onChange={this.handleChange}
                 />
             
                 </div>
                 <div className="form-label">At Police Station</div>
                 <input
                 className='form-field'
                 type="text"
                 id="atPoliceStation"
                 defaultValue={this.state.atPoliceStation}
                 onChange={this.handleChange}
                 />
             <button type="button" className="asset-submit-button" onClick={this.handleSubmit}>Submit</button>
           
           
           </div>
         
        )
    }
}