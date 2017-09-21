import React, { Component } from 'react';

export default class UploadPinsWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadPending: false,
            selectedFile: ''
        }
    }
    pendingUploadPins = (event) => {
        this.setState({
          uploadPending: true,
          selectedFile: event.target.files[0]
        });
        
        //console.log(event.target.files[0]);
      }
      handleUploadPins = () => {
        this.props.uploadPins(this.state.selectedFile);
      }
    render() {
        return (
            <div>
            <h2 className='form-title'>Upload Pins from a Spreadsheet</h2>
            <div className="form-label">
                Spreadsheet file (".xls, .xlsx")
            </div>
            <div>
                <input
                type="file"
                accept=".xls, .xlsx"
                name="pins"
                placeholder="Click here to Select..."
                className='form-field'
                
                onChange={this.pendingUploadPins}
                ref="fileUrl"/>
              </div>
              <button className="asset-submit-button" onClick={this.handleUploadPins}>Upload</button>
            
          </div>
        )
    }
}