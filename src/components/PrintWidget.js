import React, {Component} from 'react';
import ReportItem from './ReportItem';

export default class PrintWidget extends Component {
    
    render() {        
        return(
            <div ref='root'>                
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
                            <h2>Incident Report</h2>
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