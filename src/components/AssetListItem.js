// components/AssetListItem.js

import React, {Component, /* PropTypes */} from 'react'
import './components.css';

export default class AssetListItem extends Component {

  handleOnClick = () => {
    
    this.props.viewAsset(this.props.asset.dnaCode);
  };
  render() {

    return (
      <tr onClick={this.handleOnClick} className="tr-highlight">
        <td className="td">{this.props.asset.dnaCode}</td> 
        <td className="td">{this.props.asset.assetCode} </td>
        <td className="td">{this.props.asset.description} </td>
        <td className="td">{this.props.asset.dateAdded} </td>
        <td className="td">{this.props.asset.dateModified}</td>
      </tr>
    )
  }

}

// AssetListItem.propTypes = {
//   viewAsset: PropTypes.func.isRequired,
//   dnaCode: PropTypes.string.isRequired,
//   assetCode: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   dateAdded: PropTypes.string.isRequired,
//   dateModified: PropTypes.string.isRequired
// }
