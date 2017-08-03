
import React, { Component, PropTypes  } from 'react'

import './components.css';

export default class AddAssetWidget extends Component {
constructor(props) {
    super(props);   
    
    this.addAsset = this.addAsset.bind(this);
  }
  addAsset() {   
    const asset = {
      dnaCode: this.refs.dnaCode.value.trim(),
      assetCode: this.refs.assetCode.value.trim(),
      description: this.refs.descripton.value.trim(),
      status: "Active",
      imageUrls: []
    }
    this.props.addAsset(asset);
  }
  render() {
    //const { errorMessage } = this.props.errorMessage;
    

    return (
      <div>
         <form>
        
        { this.props.errorMessage && 
          <div>
          { this.props.errorMessage }
          </div>

        }
        <div className="inline-div">
            <label className="form-label" htmlFor="dnaCode">DNA Code:</label>
            </div><div className="inline-div">
            <input
              className='form-field'
              type="text"
              ref="dnaCode"
              id="dnaCode"
              placeholder="DNA Code"/>
          </div><div className="inline-div">
            <label className="form-label" htmlFor="assetCode">Asset Code:
            </label>
            </div><div className="inline-div">
            <input
              className='form-field'
              type="text"
              placeholder="Asset Code"
              ref="assetCode"
              id="assetCode"/>
            </div><div className="inline-div">
          
            <label className="form-label" htmlFor="descripton">Description:
            </label>
            </div><div className="inline-div">
            <input
              className='form-field'
              type="text"
              placeholder="Description"
              ref="descripton"
              id="descripton"/>
              </div><div className="inline-div">
            <button type="button" className="asset-submit-button" onClick={this.addAsset}>Submit</button>
          </div>
         
          
      </form>
        
      </div>
    )
  }

  
}

AddAssetWidget.propTypes = {  
  addAsset: PropTypes.func
}
