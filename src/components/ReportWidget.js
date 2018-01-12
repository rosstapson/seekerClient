import React, {Component} from 'react';
import ReportItem from './ReportItem';

export default class ReportWidget extends Component {
    
    render() {        
        return(
            <div ref='root'>
                <button style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    fontSize: '18px',
                    color: '#FFF',
                    background: '#2b7485',                    
                    borderRadius: '4px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    boxShadow : '10px 10px 10px  #808080'
                    }} 
                    onClick={this.props.hideReportWidget}>Back</button>
                    <button style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        fontSize: '18px',
                        color: '#FFF',
                        background: '#2b7485',                    
                        borderRadius: '4px',
                        marginRight: '5px',
                        marginLeft: '5px',
                        boxShadow : '10px 10px 10px  #808080'
                        }} 
                        onClick={this.props.print}>Print</button>
                <div 
                    id='printable'
                    style={{          
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'row',
                    justifyContent: 'center'}}>
                    <div className="table">                        
                        <div style={{
                            textAlign: 'left',
                            fontSize: '22px',
                            marginBottom: '12px',
                            color: '#757575',
                            padding: '15px'
                            }}>
                            <h2>SeekerDNASecure Asset Incident Report</h2>
                        </div>                            
                        {this.props.assets.map((asset) => {
                            return <ReportItem asset={asset} key={asset.dnaCode}/>
                        })}                        
                    </div>
                </div>
            </div>
        )
    }
}