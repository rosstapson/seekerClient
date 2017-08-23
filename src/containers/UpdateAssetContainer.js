import React, {Component} from 'react'

import UpdateAsset from '../components/UpdateAsset'

import {browserHistory} from 'react-router';

export default class UpdateAssetContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingUpdateAsset: false,
            asset: this.props.location.state.asset
        }
        
    }
    transferAsset = (asset) => {
        console.log("updateassetcontainer.js transferAsset");
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
            alert("Asset transfer initiated.")
            return;
    
          });
      }
    
    updateAsset = (asset) => {
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
            this.setState({pendingUpdateAsset: false});
            browserHistory.push("/assets");  
          });
      }
    render() {
        return (
           <div><UpdateAsset
                  asset={this.state.asset}                  
                  updateAsset={this.updateAsset}
                  transferAsset={this.transferAsset}
                  />
                  </div>
              
        )
    }
}