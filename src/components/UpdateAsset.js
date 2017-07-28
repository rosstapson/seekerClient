// components/AssetListItem.js

import React, {
  Component,
  /* PropTypes */
} from 'react'
import ImageListItem from './ImageListItem';

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
    this.pendingUploadImage = this
      .pendingUploadImage
      .bind(this);
    this.handleUploadImage = this
      .handleUploadImage
      .bind(this);
    this.handleDeleteImage = this
      .handleDeleteImage
      .bind(this);
    this.statusChanged = this
      .statusChanged
      .bind(this);

    this.state = {
      imageIsUploading: false,
      uploadPending: false,
      imageUploadError: false,
      selectedFile: '',
      imageIsDeleting: false,
      showTransferWidget: false, 
      //imageUrlToDelete: '',
      imageUrls: this.props.asset.imageUrls

    }

  }
  // handleOnChange(event) {   this.setState({isEditing: true}); }
  handleClose(event) {
    //console.log("handleClose");
    this
      .props
      .close();

  }
  pendingUploadImage(event) {
    this.setState({
      uploadPending: true,
      selectedFile: event.target.files[0]
    });
    //console.log(event.target.files[0]);
  }
  handleDeleteImage(url) {
    if (!confirm("Delete Image?")) {
      return;
    }
    this.setState({
      imageIsDeleting: true,
      //imageUrlToDelete: url
    });
    // call props.deleteImage remove url from  this.props.asset.imageUrls
    this
      .props
      .deleteImage(url, this.props.asset.dnaCode)
      .then(() => {
        //console.log("urls: " + this.state.imageUrls);
        //console.log("url to filter by: " + url);
        var tempUrls = this.state.imageUrls.filter((value) => {
            return value !== url;
          });
        //console.log("tempUrls: " + tempUrls);
        this.setState({imageUrls: tempUrls, imageIsDeleting: false});
        //console.log("urls: " + this.state.imageUrls);
      })
      .catch((err) => {
        alert(err);
        this.setState({imageIsDeleting: false});
      });

  }
  handleUploadImage(event) {
    event.preventDefault();
    //console.log(event);

    this.setState({
      uploadPending: false,
      imageIsUploading: true
    });
    this
      .props
      .uploadImage(this.state.selectedFile)
      .then((imageUrl) => {
        var tempArray = this.state.imageUrls.slice();
        tempArray.push(imageUrl);        

        this.setState({
          imageIsUploading: false, 
          imageUploadError: false,          
          imageUrls: tempArray
      });
      }) 
      .catch((err) => {
        //alert(err);
        this.setState({imageIsUploading: false, imageUploadError: err})
      });
  }
  statusChanged(event) {
    
    if (event.target.value === "PendingTransfer") {
      this.setState({
        showTransferWidget: true,
        showAlertWidget: false
      });
    }
    if (event.target.value === "Alert") {
      this.setState({
        showAlertWidget: true,
        showTransferWidget: false
      })
    }
    if (event.target.value === "Active") {
      this.setState({
        showAlertWidget: false,
        showTransferWidget: false
      })
    }
  }
  handleUpdate() {
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
              <div className="inline-div">
                <label className="form-label" htmlFor="status">Status:
                </label>
              </div>
              <div className="inline-div">
                <select
                  className='form-field'
                  defaultValue={this.props.asset.status}
                  onChange={this.statusChanged}
                  ref="status"
                  id="status">                  
                  <option value="Active">Active</option>
                  <option value="Alert">Alert</option>
                  <option value="PendingTransfer">Pending Transfer</option>
                </select>
              </div>
               <div className="inline-div">

                {this.state.showTransferWidget &&
                  <div className="inline-div">

                <label className="form-label" htmlFor="description">Transfer:
                </label>
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
        <div className="float-right">

          <div className="form-title">
            Asset Images
          </div>
          <div>

            <div>
              {this               
                .state
                .imageUrls
                .map(function (url) {
                  return (
                    <div key={url}><ImageListItem url={url} deleteImage={this.handleDeleteImage}/></div>
                  )
                }, this)
}

            </div>
            <form>
              {this.state.imageUploadError && <div>{this.state.imageUploadError}</div>
}
              <div className="inline-field-div">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  placeholder="Click here to Select..."
                  className='form-field'
                  
                  onChange={this.pendingUploadImage}
                  ref="fileUrl"/>
              </div>
              <div className="inline-div">
                <button className="asset-submit-button" onClick={this.handleUploadImage}>Upload</button>
              </div>
              {this.state.imageIsUploading && <div className="loader">Uploading Image...</div>
}
            </form>
          </div>

        </div>
      </div>
    )
  }

}
