import React, {Component} from 'react';
var ReactDOMServer = require('react-dom/server');
import OutputTemplate from './OutputTemplate';

export default class Controls extends Component {
  save() {
    this.props.updateState({
      prodInfo: {
        prodName: this.refs.prodName.value,
        prodId: this.refs.prodId.value
      }
    });
    console.log(ReactDOMServer.renderToStaticMarkup(React.createElement(OutputTemplate, {})));
  }
  render() {
    return (
      <div id='Controls' className="flex-it flex-col controls">
      <label>
        ProdName:
        <input ref="prodName" defaultValue={this.props.prodInfo.prodName}/>
      </label>
        <label className="text-right">
          ProdId:
          <input ref="prodId" defaultValue={this.props.prodInfo.prodId}/>
        </label>
        <button onClick={() => this.save()}>Save</button>
      </div>
    )
  }
}

Controls.propTypes = {
  updateState: React.PropTypes.func.isRequired,
  prodInfo: React.PropTypes.object.isRequired
}

export default Controls;
