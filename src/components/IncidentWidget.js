import React, { Component } from 'react';
import AlertWidget from './AlertWidget';

export default class IncidentWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingUpdate: false,
            isUpdating: false,
            asset: this.props.asset,
            incident: this.props.incident
        }
    }
    handleCancel = () => {
        this.setState({ isShowingUpdate: false})
    }
    updateIncident = (incident) => {
        this.setState({
            isUpdating: true,
            isShowingUpdate: false
        });
        this.props.updateIncident(incident);
    }
    handleUpdatePressed = () => {
        this.setState({
            isShowingUpdate: true
        })
    }
    render() {
        if (this.state.isShowingUpdate) {
            return (
                <AlertWidget 
                    asset={this.state.asset}
                    incident={this.state.incident}
                    updateIncident={this.updateIncident}
                    handleCancel={this.handleCancel}
                />
            )
        }
        else {
            if (this.state.isUpdating) {
                return <div  className="loader">Updating incident report...</div>
            }
            else {
                return (
                <div style={{border: "1px #96bdea"}}>
                    <div className="form-label">Case Number</div><div className="td">{this.state.incident.caseNumber}</div><br/>
                    <div className="form-label">Police Station</div><div className="td">{this.state.incident.atPoliceStation}</div><br/>
                    <div className="form-label">Date Reported</div><div className="td">{this.state.incident.dateReported}</div><br/>                    
                    <div className="form-label">Description</div><div>{this.state.incident.description}</div><br/>
                    <div className="form-label">Status</div><div>{this.state.incident.status}</div><br/>
                    <div>
                    {!this.state.showUpdateWidget && 
                    <button
                        type="button"
                        className="asset-submit-button"
                        onClick={this.handleUpdatePressed}>Update Incident Report</button>
                    }                
                    </div>
                </div>
                )
            }
        }
    }
}