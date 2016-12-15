import React, {Component, PropTypes} from 'react'
import AssetList from '../components/AssetList'
import AddAssetWidget from '../components/AddAssetWidget'
import UpdateAsset from '../components/UpdateAsset'

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
    this.closeViewAsset = this
      .closeViewAsset
      .bind(this);
    this.viewAsset = this
      .viewAsset
      .bind(this);
    this.updateAsset = this
      .updateAsset
      .bind(this);
    this.uploadImage = this
      .uploadImage
      .bind(this);
    this.deleteImage = this
      .deleteImage
      .bind(this);
    this.deleteAsset = this
      .deleteAsset
      .bind(this);
    this.setState = this
      .setState
      .bind(this);
    this.state = {
      showAddAsset: false,
      showUpdate: false,
      assetToView: null,
      pendingAddAsset: false,
      pendingUpdateAsset: false,
      pendingDeleteAsset: false,
      pendingViewAsset: false
    };
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
        this.setState({
          showAddAsset: false, 
          pendingAddAsset: false,
          showUpdate: true,
          assetToView: asset
      });
        return json.assets;

      });
  }
  closeViewAsset() {
    this.setState({showUpdate: false, assetToView: ''});
  }
  viewAsset(asset) {
    console.log("View Asset: " + asset.dnaCode);
    //if (confirm("wait a sec...")) {
    this.setState({showUpdate: true, assetToView: asset});
    //}

  } 
  uploadImage(file) {
    console.log("Asset.js uploadImage");
    console.log('file name: ' + file.name);
    
    var formData = new FormData();
    formData.append('username', localStorage.getItem('username'));
    formData.append('dnaCode', this.state.assetToView.dnaCode);
    formData.append('image', file);
    console.log(formData);
    let config = {
      method: 'post',
      body: formData
      }
    
    return fetch("http://localhost:3001/file-upload", config)    
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          console.log("!response.ok");
          //browserHistory.push("/error");
        }
        console.log("json.imageUrl: " + json.imageUrl);
        return json.imageUrl;

      });
      
    
  }
  updateAsset(asset) {
    this.setState({pendingUpdateAsset: true});

    console.log("Asset.js updateAsset");
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
    return fetch("http://localhost:3001/updateasset", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          console.log("!response.ok");
          browserHistory.push("/error");
        }
        console.log("json.assets: " + json.assets);
        this.setState({showUpdate: false, pendingUpdateAsset: false});
        return json.assets;

      });
  }
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
  deleteImage(url, dnaCode) {  

    console.log("deleteImage - " + url + ":" + localStorage.getItem('username'));
   
    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        url: url,
        dnaCode: dnaCode
      })
    }
    return fetch("http://localhost:3001/deleteimage", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          alert(response.errorMessage);
        }
        return;

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
          User&nbsp;{username}&nbsp;Assets
        </div>
        {!this.state.showUpdate &&
        <div>
          <button
            className="asset-submit-button"
            onClick={this
            .showAddAsset
            .bind(this)}>Add New</button>
          {this.state.showAddAsset && <div><AddAssetWidget addAsset={this.addAsset}/></div>
          }
        

        </div>
        }
        {this.state.showUpdate && 
          <div><UpdateAsset
          asset={this.state.assetToView}
          close={this.closeViewAsset}
          updateAsset={this.updateAsset}
          uploadImage={this.uploadImage}
          deleteImage={this.deleteImage}
          /></div>
        }
        {!this.state.showUpdate &&
        <div>
          <AssetList
            promise={this.getAssetsForUsername(username)}
            viewAsset={this.viewAsset}
            deleteAsset={this.deleteAsset}/>

        </div>
        }
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