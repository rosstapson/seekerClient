import React, {Component} from 'react';

import UploadPinsWidget from '../components/UploadPinsWidget';
import AddPinWidget from '../components/AddPinWidget';
import { API_ROOT } from '../apiConfig';

export default class AddPinsContainer extends Component {
    
    addPin = (product) => {        
        let config = {
            method: 'post',
            headers: {
               'content-type': 'application/json',               
              'x-access-token': localStorage.getItem('id_token')
            },
            body: JSON.stringify(product)
        }
      
          return fetch( API_ROOT+ "/add-pin", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {               
              if (!response.ok) {
                alert(json.errorMessage);
                return;
              }
              if (json.errorMessage) {
                  alert(json.errorMessage);
                  return;
              }
              alert("Pin added!");
              return;
            });
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

    return fetch(API_ROOT + "/upload-pins", config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          alert("Unable to upload file");
        }
        if (json.rejected) {
            alert("rejected: " + json.rejected);            
        }
        return;
      });
    }
    render() {
        return(
            <div style={{                
                display: 'flex',
                flex: '1',
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
                <div>
                    <UploadPinsWidget uploadPins={this.uploadPins}/>
                </div>
                <div>
                    <AddPinWidget addPin={this.addPin} />
                </div>
            </div>
        )
    }

}