import React, { Component } from 'react';

export default class PDFItem extends Component {
    render() {
        if (this.props.asset.incidents.length === 0) {
            return (
                <div style={{
                    borderStyle: "solid", 
                    borderWidth: "1px"                    
                }}>
                <h2>DNA Pin:  {this.props.asset.dnaCode}</h2>
                        No incidents reported.
                        <br/>
                </div>             
            )
        }
        else {
            return(
                <div style={{
                    borderStyle: "solid", 
                    borderWidth: "1px",
                    
                }}>
                <h2 style={{backgroundColor: 'grey'}}>DNA Pin: {this.props.asset.dnaCode}</h2>
                    {this.props.asset.incidents.map((incident) => {                        
                        return <div key={incident.incidentID}>
                                    <h3>Case Number</h3>                               
                                    {incident.caseNumber}<br/>
                                    <h3>Police Station</h3>                                                                   
                                    {incident.atPoliceStation}                                
                                <br/>                                
                                    <h3>Date Reported</h3>                                
                                    {incident.dateReported}
                                <br/>
                                    <h3>Description</h3>                               
                                    {incident.description}
                                <br/>
                                    <h3>Status</h3>                               
                                    <div style={{
                                        borderBottom: "2px solid black",
                                        textAlign: "left",
                                        padding: "15px"
                                    }}>{incident.status}</div><hr/>
                        </div>
                    })}                    
                </div>
            )
        }
    }
}