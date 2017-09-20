import React, {Component} from 'react';

import UploadPinsWidget from '../components/UploadPinsWidget';

export default class AddPinsContainer extends Component {
    constructor(props) {
        super(props);
        console.log("AddPinsContainer  constructor");
    }
    uploadPins = (selectedFile) => {
        
    var formData = new FormData();
    formData.append('username', localStorage.getItem('userInQuestion'));
    
    formData.append('image', selectedFile);
    
    let config = {
      method: 'post',
      headers: {
         //'content-type': 'application/json',
         
        'x-access-token': localStorage.getItem('id_token')
      },
      body: formData
    }

    return fetch("https://seekerdnasecure.co.za:3002/upload-pins", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          alert("Unable to upload file");
        }
        if (json.rejected) {
            console.log("rejected: " + json.rejected);
        }
        return;
      });
    }
    render() {
        return(
            <div><UploadPinsWidget uploadPins={this.uploadPins}/></div>
        )
    }

}