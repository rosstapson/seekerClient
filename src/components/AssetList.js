// components/AssetList.js

import React, {Component} from 'react'
import './components.css';
// eslint-disable-next-line
import AssetListItem from './AssetListItem';


export default class AssetList extends Component {
  constructor(props) {
    super(props);
    this.handleFilterByChange = this
      .handleFilterByChange
      .bind(this);
    this.handleFilterFieldChange = this
      .handleFilterFieldChange
      .bind(this);
    this.customFilter = this
      .customFilter
      .bind(this);
    this.state = {
      loading: true,
      error: null,
      assets: null,
      filterField: 'description', 
      filterBy: ''
    };
  }
  handleFilterByChange(event) {
    var tempFilterField = this.state.filterField;
    var tempAssets = this.state.assets.filter(function(asset) {
      
    var keys = Object.keys(asset);
    for (var i = 0, len = keys.length; i < len; i++) {
      if (keys[i] === tempFilterField) {
        if (asset[keys[i]].includes(event.target.value)) {
          return true;
        }
      }
    }
    return false;
    });
    this.setState({
      filterBy: event.target.value,
      filteredAssets: tempAssets
    });
    console.log(this.state.filterField + ":" + event.target.value);
    
  }
  handleFilterFieldChange(event) {
    this.setState({filterField: event.target.value});    
  }
  customFilter(asset, arg) {
    //var tempFilterBy = this.state.filterBy;
    var tempFilterField = this.state.filterField;
    var keys = Object.keys(asset);
    for (var i = 0, len = keys.length; i < len; i++) {
      if (keys[i] === tempFilterField) {
        if (asset[keys[i]].includes(arg)) {
          return true;
        }
      }
    }
    return false;
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
      
      return (
        <div>
        <div className="inline-div">Search:</div>
        <div className="inline-div">
        <input
          type="text"
          value={this.state.filterBy}
          onChange={this.handleFilterByChange}/>
          </div>
        <div className="inline-div">
          <select
            className="select"
            value={this.state.filterField}
            onChange={this.handleFilterFieldChange}>
            <option value="description">Description</option>
            <option value="dnaCode">DNA Code</option>
            <option value="assetCode">Asset Code</option>
            <option value="dateCreated">Date Created</option>
            <option value="dateUpdated">Date Updated</option>
          </select>
        </div><div>
        <table className="table">
        <tbody>
        <tr>
        <td className="column-name">DNA Code</td>
        <td className="column-name">Asset Code</td>
        <td className="column-name">Description</td>
        <td className="column-name">Date Added</td>
        <td className="column-name">Last Modified</td>
        </tr>
          {this.state.filterBy && 
              this.state.filteredAssets.map(asset => <AssetListItem
              key={asset.dnaCode}
              asset={asset}
              viewAsset={this.props.viewAsset}
              deleteAsset={this.props.deleteAsset} />)
          }
          {!this.state.filterBy &&
            this.state.assets.map(asset => <AssetListItem
              key={asset.dnaCode}
              asset={asset}
              viewAsset={this.props.viewAsset}
              deleteAsset={this.props.deleteAsset} />)
          }
        </tbody>
        </table></div></div>
      )

    }
  }

}
