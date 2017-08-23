// components/AssetListItem.js

import React, {
  Component,
  /* PropTypes */
} from 'react'

import TransferAssetWidget from './TransferAssetWidget';

import './components.css';

export default class UpdateAsset extends Component {
  constructor(props) {
    super(props);
    this.setState = this
      .setState
      .bind(this);
    //this.handleOnChange = this.handleOnChange.bind(this);
    this.handleUpdate = this
      .handleUpdate
      .bind(this);
    this.handleClose = this
      .handleClose
      .bind(this);
    
    
    this.handleAlertPressed = this
      .handleAlertPressed
      .bind(this);
    this.handleTransferPressed = this
      .handleTransferPressed
      .bind(this);
    this.handleTransferAsset = this
      .handleTransferAsset
      .bind(this);

    this.state = {
      
      uploadPending: false,
      imageUploadError: false,
      selectedFile: '',
      showTransferWidget: false,
      showAlertWidget: false,     
      imageUrls: this.props.asset.imageUrls,
      asset: this.props.asset

    }

  }
  // handleOnChange(event) {   this.setState({isEditing: true}); }
  handleClose(event) {
    //console.log("handleClose");
    this
      .props
      .close();

  }
  
  
  handleUpdate() {
    alert("handleUpdate");
    var tempAsset = this.props.asset;
    tempAsset.dnaCode = this
      .refs
      .dnaCode
      .value
      .trim();
    tempAsset.assetCode = this
      .refs
      .assetCode
      .value
      .trim();
    tempAsset.itemCode = this
      .refs
      .itemCode
      .value
      .trim();
    tempAsset.description = this
      .refs
      .description
      .value
      .trim();
    tempAsset.location = this
      .refs
      .location
      .value
      .trim();
    tempAsset.unitOfMeasure = this
      .refs
      .unitOfMeasure
      .value
      .trim();
    tempAsset.audited = this
      .refs
      .audited
      .value
      .trim();
    tempAsset.status = this
      .refs
      .status
      .value
      .trim();
    tempAsset.capturedOrModifiedBy = this
      .refs
      .capturedOrModifiedBy
      .value
      .trim();
    tempAsset.dateReported = this
      .refs
      .dateReported
      .value
      .trim();
    tempAsset.caseNumber = this
      .refs
      .caseNumber
      .value
      .trim();
    tempAsset.atPoliceStation = this
      .refs
      .atPoliceStation
      .value
      .trim();
    tempAsset.nextAuditDate = this
      .refs
      .nextAuditDate
      .value
      .trim();
    tempAsset.appliedBy = this
      .refs
      .appliedBy
      .value
      .trim();
    tempAsset.checkedBy = this
      .refs
      .checkedBy
      .value
      .trim();
    this
      .props
      .updateAsset(tempAsset);
  }
    handleAlertPressed() {      
      this.setState({
        showAlertWidget: true,
        showTransferWidget: false
      });
    }
    handleTransferPressed() {
      
      this.setState({
        showAlertWidget: false,
        showTransferWidget: true
      });
    }
    handleTransferAsset(username) {
      //alert("handleTransferAsset: " + username);
      let tempAsset = Object.assign(
        {},
        this.state.asset,
        {
          
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
  render() {

    return (
      <div>
        <div className="float-left">
          <form>
            <div className="form-title">
              Asset Details
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="dnaCode">DNA Code:</label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  ref="dnaCode"
                  id="dnaCode"
                  disabled
                  defaultValue={this.props.asset.dnaCode}/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="assetCode">Asset Code:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.assetCode}
                  ref="assetCode"
                  id="assetCode"/>
              </div>
            </div>
            <div>
              <div className="inline-div">

                <label className="form-label" htmlFor="itemCode">Item Code:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.itemCode}
                  ref="itemCode"
                  id="itemCode"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="status">Status:
                </label>
              </div>
              <div className="inline-div">
                <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  ref="status"
                  id="status"
                  disabled
                  defaultValue={this.props.asset.status}/>
              </div>
              </div>
            </div>
            <div>
            {this.props.asset.status === "Active" &&
            <div className="inline-div">
                <button
                  type="button"
                  className="asset-submit-button"
                  onClick={this.handleTransferPressed}>Transfer</button>
              </div>
            }
            {this.props.asset.status === "Active" &&
            <div className="inline-div">
                <button
                  type="button"
                  className="asset-submit-button"
                  onClick={this.handleAlertPressed}>Alert</button>
              </div>
              }
            </div>
            <div>
            {this.state.showTransferWidget &&
              <div className="inline-div">
               <TransferAssetWidget 
                  transferAsset={this.handleTransferAsset}
                  
               />
              </div>
                }
              {this.state.showAlertWidget &&
                  <div className="inline-div">

                <label className="form-label" htmlFor="description">Alert:
                </label>
              </div>
                }
              </div>
            
            <div>
              <div className="inline-div">

                <label className="form-label" htmlFor="description">Description:
                </label>
              </div>
              <div className="inline-div">
                <textarea
                  className='textarea'
                  defaultValue={this.props.asset.description}
                  ref="description"
                  id="description"/>
              </div>

            </div>
            <div>
              <div className="inline-div">

                <label className="form-label" htmlFor="location">Location:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.location}
                  ref="location"
                  id="location"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="unitOfMeasure">Unit of Measure:
                </label>
              </div>
              <div className="inline-div">
                <select
                  className="select"
                  defaultValue={this.props.asset.unitOfMeasure}
                  ref="unitOfMeasure"
                  id="unitOfMeasure">

                  <option value="EA">EA</option>
                  <option value="Kg">Kg</option>
                  <option value="Lt">Lt</option>
                  <option value="PAA">PAA</option>
                  <option value="MT">MT</option>
                  <option value="MT2">MT2</option>
                </select>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="audited">Audited:
                </label>
              </div>
              <div className="inline-div">
                <select
                  className="select"
                  defaultValue={this.props.asset.audited}
                  ref="audited"
                  id="audited">

                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                  <option value="Re-Audited">Re-Audited</option>

                </select>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="dateAdded">Date Added:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.dateAdded}
                  disabled
                  ref="dateAdded"
                  id="dateAdded"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="dateUpdated">Last Modified:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.dateUpdated}
                  disabled
                  ref="dateUpdated"
                  id="dateUpdated"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="capturedOrModifiedBy">Captured/Modified By:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.capturedOrModifiedBy}
                  ref="capturedOrModifiedBy"
                  id="capturedOrModifiedBy"/>
              </div>
            </div>
           
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="dateReported">Date Reported:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.dateReported}
                  ref="dateReported"
                  id="dateReported"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="caseNumber">Case Number:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.caseNumber}
                  ref="caseNumber"
                  id="caseNumber"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="atPoliceStation">At Police Station:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.atPoliceStation}
                  ref="atPoliceStation"
                  id="atPoliceStation"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="nextAuditDate">Next Audit Date:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.nextAuditDate}
                  ref="nextAuditDate"
                  id="nextAuditDate"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="appliedBy">Applied By:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.appliedBy}
                  ref="appliedBy"
                  id="appliedBy"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <label className="form-label" htmlFor="checkedBy">Checked By:
                </label>
              </div>
              <div className="inline-div">
                <input
                  className='form-field'
                  type="text"
                  defaultValue={this.props.asset.checkedBy}
                  ref="checkedBy"
                  id="checkedBy"/>
              </div>
            </div>
            <div>
              <div className="inline-div">
                <button
                  type="button"
                  className="asset-submit-button"
                  onClick={this.handleUpdate}>Update</button>
              </div>
              <div className="inline-div">
                <button
                  type="button"
                  className="asset-submit-button"
                  onClick={this.handleClose}>Close</button>
              </div>
            </div>
          </form>
        </div>
       
      </div>
    )
  }

}
