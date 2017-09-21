import React, { Component } from 'react';

export default class AddPinWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadPending: false,
            product: {}
        }
    }
    pendingAddPin = (event) => {
        this.setState({
          uploadPending: true
        });
        
        //console.log(event.target.files[0]);
      }
      handleAddPin = () => {
          let product = {...this.state.product};
          product.status = "Unallocated";
          product.addedBy = localStorage.username;
        this.props.addPin(product);
      }
      handleChange = (event) => {
        let product = {...this.state.product};
        
        product[event.target.id] = event.target.value;
        this.setState({ product });
        
      }
    render() {
        return (
            <div>
            <h2 className='form-title'>Add DNA Product Pin</h2>
            <div>
            <div className="form-label">
                DNA Product Pin
            </div>
            <input
                className='form-field'
                type="text"
                id="dnaCode"                
                onChange={ this.handleChange }
            />
            </div>
            <div>
            <div className="form-label">
                Product Name
            </div>
            <input
                className='form-field'
                type="text"
                id="productName"                
                onChange={ this.handleChange }
            />
            </div>
              <button className="asset-submit-button" onClick={this.handleAddPin}>Add</button>
            
          </div>
        )
    }
}