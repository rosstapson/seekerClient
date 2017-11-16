// components/AssetListItem.js

import React, {Component, /* PropTypes */} from 'react'
import './components.css';
import {browserHistory} from 'react-router';

export default class AssetListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGod: localStorage.getItem('isGod')
    }
  }
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
        <td className="td">{this.props.asset.assetCode}</td>
        <td className="td">{this.props.asset.description}</td>
        <td><button className="asset-submit-button" onClick={this.handleViewImages}>Images</button></td>
        <td><button className="asset-submit-button" onClick={this.handleView}>View/Update</button></td>
        {this.state.isGod &&
          <td><button className="asset-submit-button" onClick={this.handleDelete}>Delete</button></td>
        }
      </tr>
    )
  }

}

