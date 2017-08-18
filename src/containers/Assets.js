import React, {Component, PropTypes} from 'react'
import AssetList from '../components/AssetList'
import AddAssetWidget from '../components/AddAssetWidget'
import UpdateAsset from '../components/UpdateAsset'

import {browserHistory} from 'react-router';

export default class Assets extends Component {
  self = this;
  constructor(props) {
    super(props);

    this.addAsset = this.addAsset.bind(this);
    this.closeViewAsset = this.closeViewAsset.bind(this);
    this.viewAsset = this.viewAsset.bind(this);
    this.updateAsset = this.updateAsset.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
    // this.transferAsset = this.transferAsset.bind(this);
    this.setState = this.setState.bind(this);
    this.state = {
      showAddAsset: this.props.location.state.showAddAsset,
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
        this.setState({showAddAsset: false, pendingAddAsset: false, showUpdate: true, assetToView: asset});
        return json.assets;

      });
  }
  closeViewAsset() {
    this.setState({showUpdate: false, assetToView: ''});
  }
  viewAsset(asset) {
    this.setState({showUpdate: true, assetToView: asset});
  }
  uploadImage(file) {

    var formData = new FormData();
    formData.append('username', localStorage.getItem('userInQuestion'));
    formData.append('dnaCode', this.state.assetToView.dnaCode);
    formData.append('image', file);
    
    let config = {
      method: 'post',
      headers: {
         //'content-type': 'application/json',
         
        'x-access-token': localStorage.getItem('id_token')
      },
      body: formData
    }

    return fetch("https://seekerdnasecure.co.za:3002/file-upload", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          alert("Unable to upload image");

        }

        return json.imageUrl;

      });

  }
  updateAsset(asset) {
    this.setState({pendingUpdateAsset: true});

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
    return fetch("https://seekerdnasecure.co.za:3002/updateasset", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          alert("Error");
          browserHistory.push("/error");
        }
        this.setState({showUpdate: false, pendingUpdateAsset: false});
        return json.assets;

      });
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
  deleteImage(url, dnaCode) {

    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('id_token')
      },
      body: JSON.stringify({
        username: localStorage.getItem('userInQuestion'),
        url: url,
        dnaCode: dnaCode
      })
    }
    return fetch("https://seekerdnasecure.co.za:3002/deleteimage", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          alert(response.errorMessage);
        }
        return;

      });

  }

  transferAsset(asset) {
    console.log("Asset.js transferAsset");
    //req.body.username (seller)
    //req.body.asset (with pendingTransferToUser set to buyer's username, and status: PendingTransfer)
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
    return fetch("https://seekerdnasecure.co.za:3002/initiateTransferAsset", config)
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
          this.state.showAddAsset && <div>
            <AddAssetWidget addAsset={this.addAsset} />
            </div>
          
        }

        

        {
          this.state.showUpdate && <div><UpdateAsset
            asset={this.state.assetToView}
            close={this.closeViewAsset}
            updateAsset={this.updateAsset}
            transferAsset={this.transferAsset}
            uploadImage={this.uploadImage}
            deleteImage={this.deleteImage}/></div>
        }
        {
          !this.state.showUpdate && <div>
          <AssetList
            promise={this.getAssetsForUsername(username)}
            viewAsset={this.viewAsset}
            transferAsset={this.transferAsset}
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