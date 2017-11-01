import React, { Component } from 'react';
import cuid from 'cuid';

import './components.css';

export default class AlertWidget extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this
        .handleSubmit
        .bind(this);
        let incident = {
            status: "Active"
        };
        let updating = false;
        if (this.props.incident) {
            incident = this.props.incident;
            updating = true;
        }
        this.state = {
            asset: this.props.asset,
            incident: incident,
            updating: updating
        }
    }
    handleChange = (event) => {
        let incident = {...this.state.incident};
        incident[event.target.id] = event.target.value;
        //console.log(this.state);
        this.setState({ incident });        
      }
      handleUpdate = () => {
        this.props.updateIncident(this.state.incident);
      }
    handleCreate = () => {
        let asset = {...this.state.asset};
        let incident = {...this.state.incident};
        incident.dateReported = Date.now();
        incident.incidentID = cuid();   
        asset.status = "Alert";    
        asset.incidents.push(incident);   
        this.props.alertAsset(asset);
    }
    handleSubmit = () => {
        if (this.state.updating) {
            this.handleUpdate();
        }
        else {
            this.handleCreate();
        }
    }
    handleCancel = () => {
        this.props.handleCancel();
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
                 defaultValue={this.state.incident.caseNumber}
                 onChange={this.handleChange}
                 />             
                 </div>
                 <div className="form-label">At Police Station</div>
                 <input
                 className='form-field'
                 type="text"
                 id="atPoliceStation"
                 defaultValue={this.state.incident.atPoliceStation}
                 onChange={this.handleChange}
                 />                 
                 <div className="form-label">Description</div>
                 <textarea
                    className='form-field'
                    type="text"
                    id="description"
                    defaultValue={this.state.incident.description}
                    onChange={this.handleChange}
                    />  
                <div className="form-label">Status</div>
                <select
                    className="form-field"
                    defaultValue={this.state.incident.status}
                    onChange={ this.handleChange }
                    id="status" >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>                        
              </select><br/>
             <button type="button" className="asset-submit-button" onClick={this.handleSubmit}>Submit</button>
             <button type="button" className="asset-submit-button" onClick={this.handleCancel}>Cancel</button>
           </div>
        )
    }
}