import React, {Component} from 'react';

import ProductListItem from './ProductListItem';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.props.products,
            filterField: 'dnaCode', 
            filterBy: '',
            error: false
        }
    }
    handleFilterByChange = (event) => {
        var tempFilterField = this.state.filterField;
        var tempProducts = this.state.products.filter(function(product) {          
            var keys = Object.keys(product);
            for (var i = 0, len = keys.length; i < len; i++) {
                if (keys[i] === tempFilterField) {
                    if (product[keys[i]].includes(event.target.value)) {
                    return true;
                    }
                }
            }
            return false;
        });
        this.setState({
          filterBy: event.target.value,
          filteredProducts: tempProducts
        });    
        
      }
      handleFilterFieldChange = (event) => {
        this.setState({filterField: event.target.value});    
      }
      customFilter = (product, arg) => {        
        var tempFilterField = this.state.filterField;
        var keys = Object.keys(product);
        for (var i = 0, len = keys.length; i < len; i++) {
          if (keys[i] === tempFilterField) {
            if (product[keys[i]].includes(arg)) {
              return true;
            }
          }
        }
        return false;
      }
    render() {
        if (this.state.loading) {
            return <div  className="loader">Loading Products....</div>
          } else if (this.state.error) {
            return <span>Error: {this.state.error.message}</span>;
          } else {
        return (
            <div>
            <h2 className='form-title'>Product Pin List </h2><br />
            <div className="inline-div">Filter:</div>
            <div className="inline-div">
            <input
              type="text"
              value={this.state.filterBy}
              onChange={this.handleFilterByChange}/>
              </div>
            <div className="inline-div">
              <select
                className="form-field"
                value={this.state.filterField}
                onChange={this.handleFilterFieldChange}>                
                <option value="dnaCode">DNA Product Pin</option>
                <option value="status">Status</option>
                <option value="allocatedTo">Allocated To</option>
              </select>
            </div>
                <div style={{                
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                <div className="column-name">DNA Pin</div>
                <div className="column-name">Status</div>
                <div className="column-name">Allocated to:</div>
                </div>
                {this.state.filterBy && 
                    this.state.filteredProducts.map((product) => {
                    return <ProductListItem product={product} key={product.dnaCode}/>
                })}
                {!this.state.filterBy && 
                    this.state.products.map((product) => {
                    return <ProductListItem product={product} key={product.dnaCode}/>
                })}
                
            </div>
        )}
    }
}