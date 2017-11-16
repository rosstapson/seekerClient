import React, { Component } from 'react';

export default class ReportItem extends Component {
    render() {
        return(
            <tr>
                <td>
                    <div>
                    <h3 style={{color: 'black'}}>DNA Pin: {this.props.asset.dnaCode}</h3><br />
                    {!this.props.asset.incidents &&
                        <div>No incidents reported.</div>
                    }
                    {this.props.asset.incidents.length === 0 &&
                        <div>No incidents reported.</div>
                    }
                    {this.props.asset.incidents.map((incident) => {                        
                        return <div key={incident.incidentID}>
                        <table><tbody>
                            <tr>
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',                            
                                        color: '#2b7485',                                        
                                    }}>Case Number</div><div className="td">{incident.caseNumber}</div>
                                </td>
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: '#2b7485'
                                    }}>Police Station</div><div className="td">{incident.atPoliceStation}</div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: '#2b7485'
                                    }}>Date Reported</div><div className="td">{incident.dateReported}</div>
                                </td>                            
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: '#2b7485'
                                    }}>Description</div><div>{incident.description}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: '#2b7485',                                        
                                    }}>Status</div><div>{incident.status}</div>
                                </td>
                            </tr>
                        </tbody></table>
                        </div>
                    })}
                </div>
                </td>
            </tr>
        )
    }
}