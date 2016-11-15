
import React, {Component, PropTypes} from 'react'
import AssetListItem from '../components/AssetListItem'
import getAssetsForUsername from '../middleware/AssetStore'

//import { browserHistory } from 'react-router';

export default class Assets extends Component {
  constructor(props) {
    super(props);
    console.log("Assets constructor()");

  }
  componentWillMount () {
    var myAssets = getAssetsForUsername(this.props.username)

    this.setState({
      myAssets : myAssets,
    })
  }
  render() {
    const errorMessage = this.props.errorMessage;
    const username = localStorage.username;

    return (
      <div>
        <h2>
          User {username}
          Assets</h2>
        {errorMessage}
        <ul>
        {
          this.state.myAssets.map(
            asset => 
            <AssetListItem key={ asset.dnaCode }
              {...asset}
              /* onClick={viewAsset(asset, user id of some kind? )} */
              />
          )
        }
        </ul>
      </div>
    );
  }
 
}

Assets.propTypes = {
  //  myAssets: PropTypes.arrayOf(PropTypes.shape({
  //   dnaCode: PropTypes.string.isRequired,
  //   assetCode: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   dateAdded: PropTypes.string.isRequired,
  //   dateModified: PropTypes.string.isRequired
  // }).isRequired).isRequired,
  errorMessage: PropTypes.string
}
