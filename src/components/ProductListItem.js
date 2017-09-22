import React, {Component} from 'react';

export default class ProductListItem extends Component {

    render() {
        return (
            <div style={{                
                display: 'flex',
                flex: '1',
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
                <div className="td">{this.props.product.dnaCode}</div>
                <div className="td">{this.props.product.status}</div>
                <div className="td">{this.props.product.allocatedTo}</div>
            </div>
        )
    }
}