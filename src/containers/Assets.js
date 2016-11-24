import React, {Component, PropTypes} from 'react'
import AssetList from '../components/AssetList'
import AddAssetWidget from '../components/AddAssetWidget'

// import getAssetsForUsername from '../middleware/AssetStore' import {
import {browserHistory} from 'react-router';

export default class Assets extends Component {
  self = this;
  constructor(props) {
    super(props);
    console.log("Assets constructor()");
    // this.showAddAsset = this   .showAddAsset   .bind(this);
    
    this.addAsset = this
      .addAsset
      .bind(this);
    this.viewAsset = this
      .viewAsset
      .bind(this);
      this.deleteAsset = this
      .deleteAsset
      .bind(this);
    this.setState = this
      .setState
      .bind(this);

  }
  componentWillMount() {
    this.setState({
      showAddAsset: false, 
      pendingAddAsset: false, 
      pendingDeleteAsset: false,
      pendingViewAsset: false
  });
  }
  showAddAsset() {
    this.setState({showAddAsset: true});
  }
  addAsset(asset) {
    this.setState({pendingAddAsset: true});

    console.log("Asset.js addAsset");
    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        asset: asset
      })
    }
    return fetch("http://localhost:3001/addasset", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          console.log("!response.ok");
          browserHistory.push("/error");
        }
        console.log("json.assets: " + json.assets);
        this.setState({showAddAsset: false, pendingAddAsset: false});
        return json.assets;

      });
  }
  viewAsset(dnaCode) {
    console.log("View Asset: " + dnaCode);
  } // todo: swap the names here and implement ViewAsset.js
  deleteAsset(dnaCode) {
    if (!confirm("Delete asset?")) {
      return;
    }

    console.log("deleteAsset - " + dnaCode + ":" + localStorage.getItem('username'));
    //temporary, just to test delete:
    this.setState({pendingDeleteAsset: true});

    console.log("Asset.js deleteAsset");
    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        dnaCode: dnaCode
      })
    }
    return fetch("http://localhost:3001/deleteasset", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          console.log("!response.ok");
          browserHistory.push("/error");
        }
        console.log("json.assets: " + json.assets);
        this.setState({pendingDeleteAsset: false});
        return json.assets;

      });

  }
  
  getAssetsForUsername(username) {
    
    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({username: username})
    }
    return fetch("http://localhost:3001/assets", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          console.log("!response.ok");
          browserHistory.push("/error");
        }
        localStorage.setItem('assets', JSON.stringify(json.assets));
        return json.assets;
      }); // ; ?
    //.then(response => response, error => error);//delete this?
  }

  render() {
    if (this.state.pendingAddAsset) {
      return (
        <div className="loader">Saving Asset...</div>
      );
    }
    if (this.state.pendingDeleteAsset) {
      return (
        <div className="loader">Deleting Asset...</div>
      );
    }
    var username = localStorage.getItem('username');

    return (
      <div>
        <div className="asset-title">
          User {username}
          Assets
        </div>

        <div>
          <button
            className="asset-submit-button"
            onClick={this
            .showAddAsset
            .bind(this)}>Add New</button>
          {this.state.showAddAsset && <AddAssetWidget addAsset={this.addAsset}/>
}

        </div>
        
        <div>
          <AssetList
            promise={this.getAssetsForUsername(username)}
            viewAsset={this.viewAsset}
            deleteAsset={this.deleteAsset} />

        </div>
      </div>

    );
  }
}
Assets.propTypes = { //  myAssets: PropTypes.arrayOf(PropTypes.shape({   dnaCode:
  // PropTypes.string.isRequired,   assetCode: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,   dateAdded:
  // PropTypes.string.isRequired,   dateModified: PropTypes.string.isRequired
  // }).isRequired).isRequired,
  errorMessage: PropTypes.string
}