import React, { Component } from 'react';

export default class ReportItem extends Component {
    render() {
        if (this.props.asset.incidents.length === 0) {
            return (
                <div style={{
                    borderStyle: "solid", 
                    borderWidth: "1px",
                    
                }}>
                    <table style={{tableLayout: 'fixed', width: "80%"}}><tbody>
                    <tr>
                        <td style={{width: '40%'}}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '700',                            
                                color: 'black',
                                textAlign: "left",
                                backgroundColor: '#757575'
                                }}>DNA Pin:</h3>
                        </td>
                        <td style={{textAlign: 'left'}}>{this.props.asset.dnaCode}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>No incidents reported.
                        </td>
                        <td></td>
                    </tr>
                    </tbody></table>
                </div>             
            )
        }
        else {
            return(
                <div style={{
                    borderStyle: "solid", 
                    borderWidth: "1px",
                    
                }}>
                <table style={{tableLayout: 'fixed', width: "80%"}}><tbody>
                <tr>
                    <td style={{width: '40%'}}>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: '700',                            
                            color: 'black',
                            textAlign: "left",
                            backgroundColor: '#757575'
                        }}>DNA Pin:</h3>
                    </td>
                    <td>
                        <div style={{textAlign: 'left'}}>
                        {this.props.asset.dnaCode}
                        </div>
                    </td>
                </tr>
                    {this.props.asset.incidents.map((incident) => {                        
                        return <div key={incident.incidentID}>                        
                            <tr>
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',                            
                                        color: 'black',
                                        textAlign: "left"
                                    }}>Case Number</div>
                                </td>
                                <td>
                                    <div className="td">{incident.caseNumber}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: 'black',
                                        textAlign: "left"
                                    }}>Police Station</div>
                                </td>
                                <td>                                    
                                    <div className="td">{incident.atPoliceStation}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: 'black',
                                        textAlign: "left"
                                    }}>Date Reported</div>
                                </td>
                                <td>
                                    <div className="td">{incident.dateReported}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: 'black',
                                        textAlign: "left"
                                    }}>Description</div>
                                </td>
                                <td>
                                    <div className="td">{incident.description}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: 'black',
                                        textAlign: "left"
                                    }}>Status</div>
                                </td><td>
                                    <div style={{                                       
                                        textAlign: "left",
                                        padding: "15px"
                                    }}>{incident.status}</div>
                                </td>                                
                            </tr>
                            <hr/>
                        </div>
                    })}
                    </tbody></table>
                </div>
            )
        }
    }
}