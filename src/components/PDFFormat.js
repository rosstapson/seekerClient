import React, {Component} from 'react';
//import ReportItem from './ReportItem';
import PDFItem from './PDFItem';
import cuid from 'cuid';

export default class PDFFormat extends Component {
    
    render() {        
        return(
            
                <div  style={{          
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'row',
                    justifyContent: 'center'}}>                    
                    <div className="table">                        
                        <div  style={{
                            textAlign: 'center',
                            fontSize: '22px',
                            marginBottom: '12px',
                            color: '#757575',
                            padding: '15px'
                            }}>
                            Incident Report
                        </div>                               
                        {this.props.assets.map((asset) => {
                            return <PDFItem asset={asset} key={cuid()}/>
                        })}                       
                </div>
            </div>
        )
    }
}