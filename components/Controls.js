import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

import request from 'superagent';
import OutputTemplate from './OutputTemplate';

export default class Controls extends Component {
  constructor (props) {
    super(props);
  }
  save() {
    this.props.updateState({
      prodInfo: {
        prodName: this.refs.prodName.value,
        prodId: this.refs.prodId.value
      }
    }, () => {
      if(this.refs.checker.checked) {
        var req = request.post('/export');
        req.field('html', JSON.stringify(ReactDOMServer.renderToStaticMarkup(React.createElement(OutputTemplate, {currentState: this.props.appState}))))
           .field('js', JSON.stringify(this.props.appState))
           .field('productName', this.refs.prodName.value);

        req.end((err, res) => {
          err?console.log(err):console.log('response: ', res);
        });
        //console.log(ReactDOMServer.renderToStaticMarkup(React.createElement(OutputTemplate, {currentState: this.props.appState})));
      }
    });

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
        <div className="flex-it flex-justify-around">
          <label>Export Results? <input type="checkbox" ref="checker" defaultCheckedss={false}/></label>
          <button onClick={() => this.save()}>Save</button>
        </div>
      </div>
    )
  }
}

Controls.propTypes = {
  appState: React.PropTypes.object.isRequired,
  updateState: React.PropTypes.func.isRequired,
  prodInfo: React.PropTypes.object.isRequired
}

export default Controls;
