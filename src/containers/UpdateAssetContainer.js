import React, {Component} from 'react'

import UpdateAsset from '../components/UpdateAsset';
import { API_ROOT } from '../apiConfig';

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
        return fetch(API_ROOT + "/initiateTransferAsset", config)
          .then(response => response.json().then(json => ({json, response})))
          .then(({json, response}) => {
            if (!response.ok) {
              alert(json.errorMessage);
              return;
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
        return fetch(API_ROOT + "/updateasset", config)
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