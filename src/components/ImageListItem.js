// components/ImageListItem.js

import React, {Component, /* PropTypes */} from 'react'
import './components.css';
import { API_ROOT } from '../apiConfig';
import styles from './components.css';

export default class ImageListItem extends Component {

 
  handleDelete = () => {    
    this.props.deleteImage(this.props.image.url);
  };
  render() {

    return (
      <div>
        <div>
        <img className='img' src={API_ROOT + '/image/' + this.props.image.url} alt={this.props.image.url} />        
        </div>
        <div className={"form-label"}>Description:</div><div>{this.props.image.imageDescription}</div>
        <div className={"form-label"}>Date uploaded:</div><div>{this.props.image.dateUploaded}</div>
        <div className="inline-div">
        <button className="asset-submit-button" onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    )
  }

}

