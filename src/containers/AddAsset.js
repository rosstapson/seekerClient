import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import AddAssetWidget from '../components/AddAssetWidget';


export default class AddAsset extends Component {
    
    addAsset = (asset) => {  
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
              alert(json.errorMessage);
              return;
            }
            localStorage.setItem('assets', json.assets);           
            browserHistory.push('/assets');    
          });
      }
    render() {
      return(
        <AddAssetWidget addAsset={ this.addAsset } browserHistory={ browserHistory }/>
      )
    }
}