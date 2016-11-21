// components/AssetListItem.js

import React, {Component, /* PropTypes */} from 'react'
import './components.css';

export default class AssetListItem extends Component {

  handleOnClick = () => {
    console.log("handleOnClick");
  };
  render() {

    return (
      <li onClick={this.props.viewAsset}>{this.props.dnaCode} {this.props.assetCode} {this.props.description} {this.props.dateAdded} {this.props.dateModified}</li>
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
