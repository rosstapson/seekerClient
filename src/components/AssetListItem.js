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
        <td className="td">{this.props.asset.dateAdded} </td>
        <td className="td">{this.props.asset.dateUpdated}</td>
        <td><button className="asset-submit-button" onClick={this.handleView}>View/Update</button></td>
        <td><button className="asset-submit-button" onClick={this.handleDelete}>Delete</button></td>
      </tr>
    )
  }

}

