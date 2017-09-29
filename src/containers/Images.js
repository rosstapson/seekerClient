import React, { Component } from 'react';
import ImageListItem from '../components/ImageListItem';
import { API_ROOT } from '../apiConfig';

import '../components/components.css';


export default class Images extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            asset:  props.location.state.asset,
            imageUrls:  props.location.state.asset.imageUrls,
            updloadPending: false,
            selectedFile: '',
            imageIsDeleting: false,
            imageIsUploading: false,
        }

    }
    uploadImage = () => {
        
    var formData = new FormData();
    formData.append('username', localStorage.getItem('userInQuestion'));
    formData.append('dnaCode', this.state.asset.dnaCode);
    formData.append('image', this.state.selectedFile);
    
    let config = {
      method: 'post',
      headers: {
         //'content-type': 'application/json',
         
        'x-access-token': localStorage.getItem('id_token')
      },
      body: formData
    }

    return fetch(API_ROOT + "/file-upload", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          alert("Unable to upload image");
        }
        return json.imageUrl;
      });
    }
    deleteImage = (url) => {        
    let config = {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'x-access-token': localStorage.getItem('id_token')
        },
        body: JSON.stringify({
          username: localStorage.getItem('userInQuestion'),
          url: url,
          dnaCode: this.state.asset.dnaCode
        })
      }
      return fetch(API_ROOT + "/deleteimage", config)
        .then(response => response.json().then(json => ({json, response})))
        .then(({json, response}) => {
          if (!response.ok) {
            alert(response.errorMessage);
          }
          return;
  
        });
  
    }
    pendingUploadImage = (event) => {
        this.setState({
          uploadPending: true,
          selectedFile: event.target.files[0]
        });
        //console.log(event.target.files[0]);
      }
      handleDeleteImage = (url) => {
        if (!confirm("Delete Image?")) {
          return;
        }
        this.setState({
          imageIsDeleting: true,
         
        });
        // call deleteImage remove url from  this.props.asset.imageUrls
        this.deleteImage(url)
          .then(() => {            
            var tempUrls = this.state.imageUrls.filter((value) => {
                return value !== url;
              });            
            this.setState({imageUrls: tempUrls, imageIsDeleting: false});           
          })
          .catch((err) => {
            alert(err);
            this.setState({imageIsDeleting: false});
          });
    
      }
      handleUploadImage = (event) => {
        event.preventDefault();
        //console.log(event);
    
        this.setState({
          uploadPending: false,
          imageIsUploading: true
        });
        this.uploadImage()
          .then((imageUrl) => {
            var tempArray = this.state.imageUrls.slice();
            tempArray.push(imageUrl);        
    
            this.setState({
              imageIsUploading: false, 
              imageUploadError: false,          
              imageUrls: tempArray
          });
          }) 
          .catch((err) => {
            //alert(err);
            this.setState({imageIsUploading: false, imageUploadError: err})
          });
      }
    render() {
        return (
            <div>
            
                      <div className="form-title">
                        Asset Images
                      </div>
                      <div>
            
                        <div>
                          {this               
                            .state
                            .imageUrls
                            .map(function (url) {
                              return (
                                <div key={url}><ImageListItem url={url} deleteImage={this.handleDeleteImage}/></div>
                              )
                            }, this)
                          }
            
                        </div>
                        <form>
                          {this.state.imageUploadError && <div>{this.state.imageUploadError}</div>
                            }
                          <div className="inline-field-div">
                            <input
                              type="file"
                              accept="image/*"
                              name="image"
                              placeholder="Click here to Select..."
                              className='form-field'
                              
                              onChange={this.pendingUploadImage}
                              ref="fileUrl"/>
                          </div>
                          <div className="inline-div">
                            <button className="asset-submit-button" onClick={this.handleUploadImage}>Upload</button>
                          </div>
                          {this.state.imageIsUploading && <div className="loader">Uploading Image...</div>
                            }
                        </form>
                      </div>
            
                    </div>
        )
    }
}