// components/AssetList.js

import React, {Component} from 'react'
import './components.css';
// eslint-disable-next-line
import AssetListItem from './AssetListItem';

export default class AssetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      assets: null
    };
  }
  componentDidMount() {
    var self = this;
    this.props.promise.then(function (value) {
        self.setState({ loading: false, assets: value });
      }, function (error) {
        self.setState({ loading: false, error: error });
      });
  }
  render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    }
    else {
        return this.state.assets.map(asset =>
          <AssetListItem asset={asset} viewAsset={this.props.viewAsset} />
      
       );
      //  return <ul>
      //               {this.state.assets.map(c => 
      //                   <li key={c.dnaCode} onClick={() => this.props.viewAsset(c.dnaCode)}>
      //                       <span>
      //                           <span > {c.assetCode} </span>
      //                           <span > {c.description} </span>
      //                           <span > {c.dateAdded} </span>
      //                           <span > {c.dateUpdated} </span>
      //                       </span>
      //                   </li>)
      //               }
      //           </ul>
      
    }
  }

}
