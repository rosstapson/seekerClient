
import React, { Component  } from 'react'

import './components.css';

export default class AddAssetWidget extends Component {
constructor(props) {
    super(props);   
    this.state = {
      pendingAddAsset: false,
      asset: {
        dnaCode: '',
        assetCode: '',
        itemCode: '',              
        location: '',
        unitOfMeasure: '',
        audited: '',
        description: '',
        capturedOrModifiedBy: ''              
      }
  }
    this.addAsset = this.addAsset.bind(this);
  }
  addAsset = () => {   
    this.setState({pendingAddAsset: true});
    try {
      this.props.addAsset(this.state.asset);
    }
    catch(err) {
      alert(err);
    }
    this.setState({pendingAddAsset: false});
  }

  handleChange = (event) => {
    let asset = {...this.state.asset};
    
    asset[event.target.id] = event.target.value;
    this.setState({ asset });
    
  }
  logAsset = () => {   // just for debuggery
    console.log(this.state);
  }
  render() {
    if (this.state.pendingAddAsset) {
      return (
        <div className="loader">Saving Asset...</div>
      );
    };

    return (   
      <div style={{
        
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div>
          <h2 className='form-title'>Register New Asset</h2>
        </div>
        <div style={{
          
          display: 'flex',
          flex: '1',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <form>
            <table  className="table" style={{}}>
              <tr>
                <td>
                  <div className="form-label">
                    DNA Product Pin
                  </div>
                <br/>
                  <input
                    className='form-field'
                    type="text"
                    id="dnaCode"                
                    onChange={ this.handleChange }
                    placeholder="DNA Product Pin"/>
                </td>
                <td>
                  <div className="form-label">
                    Asset Code
                  </div>
                  <br/>
                  <input
                    className='form-field'
                    type="text"
                    id="assetCode"                
                    onChange={ this.handleChange }
                    placeholder="Asset Code"/>
                  </td>
                </tr>
                <tr>
                  <td>
                  <div className="form-label">
                    Audited
                  </div>
                  <br/>
                  <select
                  className='form-field'                
                  id="audited"                
                  onChange={ this.handleChange }
                  defaultValue="Unit Of Measure">
                  <option value="Unit Of Measure">Unit Of Measure</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Re-Audited">Re-Audited</option>                    
                  </select>
                  </td>
                  <td>
                  <div className="form-label">
                    Unit Of Measure
                  </div>
                  <br/>
                    <select
                      className='form-field'                
                      id="unitOfMeasure"                
                      onChange={ this.handleChange }
                      defaultValue="Unit Of Measure">
                      <option value="Unit Of Measure">Unit Of Measure</option>
                        <option value="EA">EA</option>
                        <option value="Kg">Kg</option>
                        <option value="Lt">Lt</option>
                        <option value="PAA">PAA</option>
                        <option value="MT">MT</option>
                        <option value="MT2">MT2</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                  <td>
                    <div className="form-label">
                      Audited
                    </div>
                  <br/>
                    <input
                      className='form-field'
                      type="text"
                      id="audited"                
                      onChange={ this.handleChange }
                      placeholder="DNA Product Pin"/>
                  </td>
                  <td>
                    <div className="form-label">
                      Asset Code
                    </div>
                    <br/>
                    <input
                      className='form-field'
                      type="text"
                      id="assetCode"                
                      onChange={ this.handleChange }
                      placeholder="Asset Code"/>
                    </td>
                  </tr>          
            </table>
            <div>
            <button type="button" className="asset-submit-button" onClick={this.addAsset}>Submit</button>
            <button type="button" className="asset-submit-button" onClick={this.logAsset}>log asset</button>
          </div>
          </form>
          </div>
        </div>
      )
  }  
}
