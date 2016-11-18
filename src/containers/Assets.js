import React, {Component, PropTypes} from 'react'
import AssetListItem from '../components/AssetListItem'
import AddAssetWidget from '../components/AddAssetWidget'

// import getAssetsForUsername from '../middleware/AssetStore' import {
import {browserHistory} from 'react-router';

export default class Assets extends Component {
  constructor(props) {
    super(props);
    console.log("Assets constructor()");
    this.showAddAsset = this
      .showAddAsset
      .bind(this);
    this.addAsset = this
      .addAsset
      .bind(this);
      this.setState = this.setState.bind(this);
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

  componentWillMount() {
    console.log("componentWillMount()");
    //var mySelf = this;
    // eslint-disable-next-line
    var myAssets = this
      .getAssetsForUsername(localStorage.getItem("username"))
      // somehow need to force it to get myAssets before rendering
      // eslint-disable-next-line
      .then(assets => {
        console.log(".then");
        this.setState({myAssets: assets, showAddAsset: false});
      })
      .catch(error => {
        console.log(error);
        browserHistory.push("/error");
      });
      console.log("other then");
  }
  render() {
    console.log("render");
    const errorMessage = this.props.errorMessage;
    const username = localStorage.username;
    const myAssets = this.state.myAssets;
    console.log(myAssets);

    return (
      <div>
        <h2>
          User {username}
          Assets</h2>
        {errorMessage}
        <div>
          <button className="asset-submit-button" onClick={this.showAddAsset}>Add New</button>

        </div>
        <div>
          {this.state.showAddAsset && <AddAssetWidget addAsset={this.addAsset}/>
}

        </div>
        <div>
          {myAssets && <ul>
            zomg.
            {myAssets
              .map(function (asset) {
                return <AssetListItem onClick={this.viewAsset}/>
              })
}}
        </ul>
        }
      </div>
    </div>

    ); } } Assets.propTypes = {//  myAssets: PropTypes.arrayOf(PropTypes.shape({   dnaCode:
    // PropTypes.string.isRequired,   assetCode: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,   dateAdded:
    // PropTypes.string.isRequired,   dateModified: PropTypes.string.isRequired
    // }).isRequired).isRequired,
    errorMessage : PropTypes.string
}