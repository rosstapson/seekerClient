// components/AssetListItem.js

import React, {Component, /* PropTypes */} from 'react'
import './components.css';
import {browserHistory} from 'react-router';

export default class AssetListItem extends Component {

  //NO THUMBNAIL ON ASSET LIST
//   {this.props.asset.imageUrls[0] && 
//     <img className='img' src={'https://seekerdnasecure.co.za:3002/image/' 
//     + this.props.asset.imageUrls[0]} alt={this.props.asset.imageUrls[0]} />
//  }
//    {!this.props.asset.imageUrls[0] &&
//      <td className="td-center">Click "View/Update" to upload images. </td>
     
//    }
  handleView = () => {    
    //this.props.viewAsset(this.props.asset);
    browserHistory.push({pathname: "/updateAsset", state: {asset: this.props.asset}})
  };
  handleViewImages = () => {    
    this.props.viewImages(this.props.asset);
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
       
        <td><button className="asset-submit-button" onClick={this.handleViewImages}>Images</button></td>
        <td><button className="asset-submit-button" onClick={this.handleView}>View/Update</button></td>
        <td><button className="asset-submit-button" onClick={this.handleDelete}>Delete</button></td>
      </tr>
    )
  }

}

