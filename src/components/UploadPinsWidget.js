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
            <div><div className="inline-field-div">
            <input
              type="file"
              accept=".xls, .xlsx"
              name="pins"
              placeholder="Click here to Select..."
              className='form-field'
              
              onChange={this.pendingUploadPins}
              ref="fileUrl"/>
              
              <button className="asset-submit-button" onClick={this.handleUploadPins}>Upload</button>
            
          </div></div>
        )
    }
}