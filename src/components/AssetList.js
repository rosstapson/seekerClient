// components/AssetList.js

import React, {Component} from 'react'
import './components.css';
// eslint-disable-next-line
import AssetListItem from './AssetListItem';
import ReportWidget from './ReportWidget';
import ReactDOMServer from 'react-dom/server';
import cuid from 'cuid';
import jsPDF from 'jspdf';
import PDFFormat from './PDFFormat';
//import html2canvas from './util/html2canvas';

export default class AssetList extends Component {
  constructor(props) {
    super(props);
    this.handleFilterByChange = this.handleFilterByChange.bind(this);
    this.handleFilterFieldChange = this.handleFilterFieldChange.bind(this); 
    this.customFilter = this.customFilter.bind(this);
    this.state = {
      loading: true,
      error: null,
      assets: null,
      filterField: 'description', 
      filterBy: '',
      viewReport: false
    };
  }
  handleFilterByChange(event) {
    var tempFilterField = this.state.filterField;
    var tempAssets = this.state.assets.filter(function(asset) {
      
    var keys = Object.keys(asset);
    for (var i = 0, len = keys.length; i < len; i++) {
      if (keys[i] === tempFilterField) {
        if (asset[keys[i]].includes(event.target.value)) {
          return true;
        }
      }
    }
    return false;
    });
    this.setState({
      filterBy: event.target.value,
      filteredAssets: tempAssets
    });    
    
  }
  handleFilterFieldChange(event) {
    this.setState({filterField: event.target.value});    
  }
  customFilter(asset, arg) {
    //var tempFilterBy = this.state.filterBy;
    var tempFilterField = this.state.filterField;
    var keys = Object.keys(asset);
    for (var i = 0, len = keys.length; i < len; i++) {
      if (keys[i] === tempFilterField) {
        if (asset[keys[i]].includes(arg)) {
          return true;
        }
      }
    }
    return false;
  }

  componentDidMount() {    
    var self = this;
    this.props.promise.then(function (value) {        
        self.setState({loading: false, assets: value});
      }, function (error) {
        self.setState({loading: false, error: error});
      });
  }
  handleViewReport = () => {    
    this.setState({ viewReport: true })
  }
  handleCancelReport = () => {
    this.setState({ viewReport: false })
  }
  makePDF = () => {
    let assets = this.state.assets;
    if (this.state.filterBy) {
      assets = this.state.filteredAssets;
    } 
    let html = ReactDOMServer.renderToStaticMarkup(<PDFFormat assets={assets} />);
    
    let doc = new jsPDF();
    
    let specialElementHandlers = {
      '#zomg': function(element, renderer){
         console.log("test");
         return true;
      }
    };
    doc.setDisplayMode(1, 'continuous', 'UseOutlines');
    doc.fromHTML(html, 15, 15, {
      'width': 500,
      'elementHandlers': specialElementHandlers
    });    
    let title = cuid();
    // doc.autoPrint();
    //doc.output("dataurlnewwindow");
    doc.save(title + '.pdf')
    //console.log(html)
    //alert(html);
  }
  render() {
    
    if (this.state.loading) {      
      return <div  className="loader">Loading Assets....</div>
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    } else if (this.state.viewReport) {
      let assets = this.state.assets;
      if (this.state.filterBy) {
        assets = this.state.filteredAssets;
      } 
      return (
        <ReportWidget hideReportWidget={this.handleCancelReport} makePDF={this.makePDF} assets={assets} />
      )
    } else {      
      return (
        <div>
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
            <option value="description">Description</option>
            <option value="dnaCode">DNA Product Pin</option>
            <option value="assetCode">Asset Name/Code</option>            
          </select>
          </div>
          <div className="inline-div">
          <button className="asset-submit-button" onClick={this.handleViewReport}>View Report</button>
        </div>
        <div  style={{          
          display: 'flex',
          flex: '1',
          flexDirection: 'row',
          justifyContent: 'center'}}>
        <table className="table">
        <tbody>
        <tr>
          <td className="column-name">DNA Pin</td>
          <td className="column-name">Asset Name/Code</td>
          <td className="column-name">Description</td>
        </tr>
          {this.state.filterBy && 
              this.state.filteredAssets.map(asset => <AssetListItem
                key={asset.dnaCode}
                asset={asset}
                viewAsset={this.props.viewAsset}
                //transferAsset={this.props.transferAsset}
                deleteAsset={this.props.deleteAsset} />)
          }
          {!this.state.filterBy &&
            this.state.assets.map(asset => <AssetListItem
              key={asset.dnaCode}
              asset={asset}
              viewAsset={this.props.viewAsset}
              viewImages={this.props.viewImages}
              //transferAsset={this.props.transferAsset}
              deleteAsset={this.props.deleteAsset} />)
          }
        </tbody>
        </table></div></div>
      )

    }
  }

}
