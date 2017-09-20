import React, {Component} from 'react';

import ProductListItem from './ProductListItem';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.props.products
        }
    }
    render() {
        //console.log("Pins! zomg" + this.state.products);
        return (
            <div>product list <br />
            {this.state.products.map((product) => {
                return <ProductListItem product={product} key={product.dnaCode}/>
            })}
            </div>
        )
    }
}