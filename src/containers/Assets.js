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
    // this.showAddAsset = this
    //   .showAddAsset
    //   .bind(this);
    
    this.addAsset = this
      .addAsset
      .bind(this);
      this.setState = this.setState.bind(this);
      
  }
  componentWillMount() {
    this.setState({showAddAsset: false});
  }
  showAddAsset() {
    this.setState({showAddAsset: true});
  }
  addAsset() {
    console.log("Asset.js addAsset");
    this.setState({showAddAsset: false});
  }
  viewAsset() {
    console.log("Asset.js viewAsset");
  }
  getAssetsForUsername(username) {

    console.log("getAssetsForUsername: " + username);

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
        console.log("json.assets: " + json.assets);
        return json.assets;
      });   // ; ?
      //.then(response => response, error => error);//delete this?
  }

  render() {
    var username = localStorage.getItem('username');

    return (
      <div>
        <h2>
          User  {username} Assets</h2>
        
        <div>
          <button className="asset-submit-button" onClick={this.showAddAsset.bind(this)}>Add New</button>
           {this.state.showAddAsset && 
             <AddAssetWidget addAsset={this.addAsset}/>
           }
        </div>
        <div>
          <AssetList promise={this.getAssetsForUsername(username)} viewAsset={this.viewAsset} />


        </div>
        </div>
       

    ); } } Assets.propTypes = {//  myAssets: PropTypes.arrayOf(PropTypes.shape({   dnaCode:
    // PropTypes.string.isRequired,   assetCode: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,   dateAdded:
    // PropTypes.string.isRequired,   dateModified: PropTypes.string.isRequired
    // }).isRequired).isRequired,
    errorMessage : PropTypes.string
}