import React, {Component} from 'react';

export default class ProductListItem extends Component {
    render() {
        return (
            <div>
            <div className="td">{this.props.product.dnaCode}</div>
            <div className="td">{this.props.product.status}</div>
            </div>
        )
    }
}