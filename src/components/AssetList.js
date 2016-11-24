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
  componentWillMount() {
    console.log("zomg!");
  }
  componentDidMount() {
    
    var self = this;
    this
      .props
      .promise
      .then(function (value) {
        // setTimeout(function () {
        //   this.setState({loading: false, assets: value})
        // }.bind(this), 3000);
        self.setState({loading: false, assets: value});
      }, function (error) {
        self.setState({loading: false, error: error});
      });
  }
  render() {
    
    if (this.state.loading) {
      //return <Spinner />;
      return <div>Loading....</div>
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    } else {
      //otherwise, use assets.forEach...?
      return (
        <table className="table">
        <tbody>
        <tr>
        <td className="column-name">DNA Code</td>
        <td className="column-name">Asset Code</td>
        <td className="column-name">Description</td>
        <td className="column-name">Date Added</td>
        <td className="column-name">Last Modified</td>
        </tr>
        
          {this
            .state
            .assets
            .map(asset => <AssetListItem
              key={asset.dnaCode}
              asset={asset}
              viewAsset={this.props.viewAsset}/>)
}
        </tbody>
        </table>
      )

    }
  }

}
