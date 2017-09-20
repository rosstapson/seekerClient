import React, {Component} from 'react';

import {browserHistory} from 'react-router';
import ProductList from '../components/ProductList'

export default class PinsContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            products: '',
            isLoadingProducts: true
        }
       
    }
     componentDidMount = () => {
         this.getPins().then((products) => {
             this.setState({
                 products: products,
                 isLoadingProducts: false
             });
         })
        
     }
    getPins = () => {  
         
            let config = {
              method: 'get',
              headers: {
                'content-type': 'application/json',
                'x-access-token': localStorage.getItem('id_token')
              }
            }
            return fetch("https://seekerdnasecure.co.za:3002/pins", config)
              .then(response => response.json().then(json => ({json, response})))
              .then(({json, response}) => {
                if (!response.ok) {
                  browserHistory.push("/error");
                }
                localStorage.setItem('products', JSON.stringify(json.products));
               
                return json.products;
              }); // ; ?
            //.then(response => response, error => error);//delete this?
          }
    render() {
        if (this.state.isLoadingProducts) {
            return (
                <div className="loader">Loading Product Pins...</div>
            )
        } 
        else  return(
            <div><ProductList products={this.state.products}/></div>
        )
    }

}