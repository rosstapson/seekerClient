
import React, { Component, PropTypes  } from 'react'

import './components.css';

export default class AddAssetWidget extends Component {
constructor(props) {
    super(props);
    
    
    this.addAsset = this.addAsset.bind(this);
  }
  addAsset() {
    console.log("addAsset");
    this.props.addAsset();
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
        <div>
            <label className="form-label" htmlFor="dnaCode">DNA Code:</label>
            <input
              className='form-field'
              type="text"
              ref="dnaCode"
              id="dnaCode"
              placeholder="DNA Code"/>
          
            <label className="form-label" htmlFor="assetCode">Asset Code:
            </label>
            <input
              className='form-field'
              type="text"
              placeholder="Asset Code"
              ref="assetCode"
              id="assetCode"/>
            
          
            <label className="form-label" htmlFor="descripton">Description:
            </label>
            <input
              className='form-field'
              type="text"
              placeholder="Description"
              ref="descripton"
              id="descripton"/>
            <button type="button" className="submit-button" onClick={this.addAsset}>Submit</button>
          </div>
         
          
      </form>
        
      </div>
    )
  }

  
}

AddAssetWidget.propTypes = {  
  addAsset: PropTypes.func
}
