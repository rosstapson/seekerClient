// components/ImageListItem.js

import React, {Component, /* PropTypes */} from 'react'
import './components.css';

export default class ImageListItem extends Component {

 
  handleDelete = () => {    
    this.props.deleteImage(this.props.url);
  };
  render() {

    return (
      <div>
        <div>
        <img className='img' src={'http://127.0.0.1:3001/image/' + this.props.url} alt={this.props.url} />
        </div>
        <div className="inline-div">
        <button className="asset-submit-button" onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    )
  }

}

