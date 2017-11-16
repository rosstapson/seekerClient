import React, {Component} from 'react';
//import ReportItem from './ReportItem';
import PDFItem from './PDFItem';

export default class PDFFormat extends Component {
    
    render() {        
        return(
            <div>
                <div  style={{          
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'row',
                    justifyContent: 'center'}}>                    
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <div  style={{
                                        textAlign: 'center',
                                        fontSize: '22px',
                                        marginBottom: '12px',
                                        color: '#757575',
                                        padding: '15px'
                                        }}>
                                        Incident Report
                                    </div>
                                </td>
                            </tr>
                            {this.props.assets.map((asset) => {
                                return <PDFItem asset={asset} key={asset.dnaCode}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}