// components/AssetListItem.js

import React, {Component, /* PropTypes */} from 'react'
import './components.css';

export default class AssetListItem extends Component {

  handleView = () => {
    
    this.props.viewAsset(this.props.asset);
  };
  handleDelete = () => {
    
    this.props.deleteAsset(this.props.asset.dnaCode);
  };
  render() {

    return (
      <tr onClick={this.handleOnClick} className="tr-highlight">
        <td className="td">{this.props.asset.dnaCode}</td>
        <td className="td">{this.props.asset.assetCode} </td>
        <td className="td">{this.props.asset.description} </td>
       
        {this.props.asset.imageUrls[0] && 
           <img className='img' src={'https://seekerdnasecure.co.za:3002/image/' 
           + this.props.asset.imageUrls[0]} alt={this.props.asset.imageUrls[0]} />
        }
          {!this.props.asset.imageUrls[0] &&
            <td className="td-center">Click "View/Update" to upload images. </td>
            
          }
        <td><button className="asset-submit-button" onClick={this.handleView}>View/Update</button></td>
        <td><button className="asset-submit-button" onClick={this.handleDelete}>Delete</button></td>
      </tr>
    )
  }

}

