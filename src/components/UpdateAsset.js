// components/AssetListItem.js

import React, {
  Component,
  /* PropTypes */
} from 'react'
import {browserHistory} from 'react-router';

import TransferAssetWidget from './TransferAssetWidget';
import AlertWidget from './AlertWidget';

import './components.css';

export default class UpdateAsset extends Component {
  constructor(props) {
    super(props);    

    let isAlert = this.props.asset.status === "Alert";
    
    this.state = {      
      uploadPending: false,
      showTransferWidget: false,
      showAlertWidget: false,
      showCaseInfo: isAlert, 
      imageUrls: this.props.asset.imageUrls,
      asset: this.props.asset
    }
    

  }
  handleChange = (event) => {
    let asset = {...this.state.asset};
    
    asset[event.target.id] = event.target.value;
    //console.log(asset);
    this.setState({ asset });
    
  }
  logAsset = () => {   // just for debuggery
    console.log(this.state);
  }
  handleClose = (event) => {
    //console.log("handleClose");
    browserHistory.push("/assets");

  }
  
  
  handleUpdate =() => {
    try {
      this.props.updateAsset(this.state.asset);
    }
    catch(err) {
      alert(err);
    }
  }
    handleAlertPressed = () => {      
      this.setState({
        showAlertWidget: true,
        showTransferWidget: false
      });
    }
    handleTransferPressed = () => {      
      this.setState({
        showAlertWidget: false,
        showTransferWidget: true
      });
    }
    handleTransferAsset = (username) => {
      //alert("handleTransferAsset: " + username);
      let tempAsset = Object.assign(
        {},
        this.state.asset,
        {
          status: "Pending Transfer",
          pendingTransfer: true,
          pendingTransferToUser: username
        }
      );
      
      this.props.transferAsset(tempAsset);
      this.setState({
        showTransferWidget: false,
        asset: tempAsset
      })
    }
    alertAsset = (asset) => {
      
      this.props.updateAsset(asset);
    }
  render() {

    return (
      <div style={{
        
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>       
        <div>
          <h2 className="form-title">
            Asset Details
          </h2>
        </div>
            <div style={{          
              display: 'flex',
              flex: '1',
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
            <form>
            <table className="table" style={{}}><tbody>
            <tr>
              <td>
                <div className="form-label">DNA Product Pin:</div>
                <br />
                <input
                  className='form-field'
                  type="text"                  
                  id="dnaCode"
                  disabled
                  defaultValue={this.props.asset.dnaCode}/>
              </td>            
            
              <td>
                <div className="form-label">Asset Name/Code:
                </div>
                <br/>
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.assetCode}
                  onChange={ this.handleChange }                 
                  id="assetCode"/>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-label">Asset Serial Number:
                </div>
              <br/>
              
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.itemCode}
                  onChange={ this.handleChange }
                  id="itemCode"/>
              </td>
            
              <td>
                <div className="form-label">Status:
                </div>
                <br/>
                
                <input
                  className='form-field'
                  type="text"
                  ref="status"
                  id="status"
                  disabled
                  defaultValue={this.props.asset.status}/>
              </td>
              </tr>
           
            <tr>
              <td>
            {this.props.asset.status === "Active" &&
            <div className="inline-div">
                <button
                  type="button"
                  className="asset-submit-button"
                  onClick={this.handleTransferPressed}>Transfer</button>
              </div>
            }
            </td>
            <td>
            {this.props.asset.status === "Active" &&
            <div className="inline-div">
                <button
                  type="button"
                  className="asset-submit-button"
                  onClick={this.handleAlertPressed}>Alert</button>
              </div>
              }
              </td>
            </tr>
            {this.state.showCaseInfo &&
              <tr><td colSpan="2"><div className="form-label" style={{color: "black", backgroundColor: "red"}}>Case Info</div></td></tr>
            }
            {this.state.showCaseInfo &&
              <tr><td colSpan="2" style={{border: "1px solid red"}}> 
                <div className="form-label">Case Number</div><div className="td">{this.state.asset.caseNumber}</div><br/>
                <div className="form-label">Police Station</div><div className="td">{this.state.asset.atPoliceStation}</div><br/>
                <div className="form-label">Date Reported</div><div className="td">{this.state.asset.dateReported}</div><br/>
              </td></tr>
            }            
            {this.state.showTransferWidget &&
              <tr><td>
               <TransferAssetWidget  transferAsset={this.handleTransferAsset} />
               </td></tr>
            }
              {this.state.showAlertWidget &&
                <tr><td>
                  <AlertWidget 
                    asset={this.state.asset}
                    alertAsset={this.alertAsset}
                  />
                </td></tr>
                }
            <tr>
              <td colSpan='2'>
                <div className="form-label">Description:
                </div>
              <br/>
                <textarea
                  className='textarea'
                  defaultValue={this.props.asset.description}
                  onChange={ this.handleChange }
                  id="description"/>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-label">Location:
                </div>
              <br/>
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.location}
                  onChange={ this.handleChange }
                  id="location"/>
              </td>
              <td>  
                <div className="form-label" >Unit of Measure:
                </div>
              <br/>              
                <select
                  className="form-field"
                  defaultValue={this.props.asset.unitOfMeasure}
                  onChange={ this.handleChange }
                  id="unitOfMeasure">
                  <option value="EA">EA</option>
                  <option value="Kg">Kg</option>
                  <option value="Lt">Lt</option>
                  <option value="PAA">PAA</option>
                  <option value="MT">MT</option>
                  <option value="MT2">MT2</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-label">Date Added:
                </div>
              <br />
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.dateAdded}
                  disabled
                  ref="dateAdded"
                  id="dateAdded"/>
              </td>
              <td>
              <div className="form-label">Audited:
              </div>
              <br />
              <select
                className="form-field"
                defaultValue={this.props.asset.audited}
                onChange={ this.handleChange }
                id="audited">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="Re-Audited">Re-Audited</option>
              </select>
            </td>
            </tr>
            <tr>
              <td>
                <div className="form-label">Last Modified:
                </div>
              <br />
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.dateUpdated}
                  disabled
                  ref="dateUpdated"
                  id="dateUpdated"/>
              </td>
           
              <td>
                <div className="form-label">Captured/Modified By:
                </div>
                <br />
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.capturedOrModifiedBy}
                  onChange={ this.handleChange }
                  id="capturedOrModifiedBy"/>
              </td>
            </tr>
           
            
            <tr>
              <td>
                <div className="form-label">Next Audit Date:
                </div>
              <br/>
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.nextAuditDate}
                  onChange={ this.handleChange }
                  id="nextAuditDate"/>
              </td>            
              <td>
                <div className="form-label">Applied By:
                </div>
              <br/>
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.appliedBy}
                  onChange={ this.handleChange }
                  id="appliedBy"/>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-label">Checked By:
                </div>
                <br />
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.checkedBy}
                  onChange={ this.handleChange }
                  id="checkedBy"/>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type="button"
                  className="asset-submit-button"
                  onClick={this.handleUpdate}>Update</button>
              </td>
              <td>
                <button
                  type="button"
                  className="asset-submit-button"
                  onClick={this.handleClose}>Close</button>
              </td>
            </tr>
            </tbody>
            </table>
            </form>
        </div>
        
      </div>
    )
  }

}
