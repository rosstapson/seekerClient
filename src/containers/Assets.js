import React, {Component, PropTypes} from 'react'
import AssetList from '../components/AssetList'
//import UpdateAsset from '../components/UpdateAsset'

import {browserHistory} from 'react-router';

export default class Assets extends Component {
  self = this;
  constructor(props) {
    super(props);

    this.addAsset = this.addAsset.bind(this);
    
    
    this.deleteAsset = this.deleteAsset.bind(this);
    // this.transferAsset = this.transferAsset.bind(this);
    this.setState = this.setState.bind(this);
    this.state = {
      showUpdate: false,
      assetToView: null,
      pendingAddAsset: false,
      pendingUpdateAsset: false,
      pendingDeleteAsset: false,
      pendingViewAsset: false
    };
  }

  // showAddAsset() {
  //   this.setState({showAddAsset: true});
  // }
  addAsset(asset) {
    this.setState({pendingAddAsset: true});

    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('id_token')
      },
      body: JSON.stringify({
        username: localStorage.getItem('userInQuestion'),
        asset: asset
      })
    }
    return fetch("https://seekerdnasecure.co.za:3002/addasset", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          browserHistory.push("/error");
        }
        //console.log("json.assets: " + json.assets);
        this.setState({ pendingAddAsset: false, showUpdate: true, assetToView: asset});        
        return json.assets;
      })
      .catch(function(err){
        alert(err.message);
      });
  }
  
  viewImages(asset) {
    console.log("assets viewImages: " + asset)
    browserHistory.push({pathname: "/images", state: { asset: asset }});
  }
  uploadImage(file) {


  }
  
  deleteAsset(dnaCode) {
    if (!confirm("Delete asset?")) {
      return;
    }
    this.setState({pendingDeleteAsset: true});

    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('id_token')
      },
      body: JSON.stringify({
        username: localStorage.getItem('userInQuestion'),
        dnaCode: dnaCode
      })
    }
    return fetch("https://seekerdnasecure.co.za:3002/deleteasset", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          browserHistory.push("/error");
        }
        
        this.setState({pendingDeleteAsset: false});
        return json.assets;

      });

  }
  
  getAssetsForUsername(username) {

    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('id_token')
      },
      body: JSON.stringify({username: username})
    }
    return fetch("https://seekerdnasecure.co.za:3002/assets", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
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
    var username = localStorage.getItem('userInQuestion');

    return (
      <div>
        
        
        {
          !this.state.showUpdate && <div>
          <AssetList
            promise={this.getAssetsForUsername(username)}
            viewAsset={this.viewAsset}
            transferAsset={this.transferAsset}
            viewImages={this.viewImages}
            deleteAsset={this.deleteAsset}/>
          </div>
        }
      </div>

    );
  }
}
Assets.propTypes = {
  errorMessage: PropTypes.string
}