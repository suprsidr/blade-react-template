import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import request from 'superagent';
import OutputTemplate from './OutputTemplate';

export default class Controls extends Component {
  constructor (props) {
    super(props);
    this.state = {
      available: []
    }
  }
  componentDidMount() {
    request
      .get('/available')
      .end((err, res) => {
        err ? console.log(err) : '';//console.log(res.body);
        this.setState( {
          available: res.body
        });
      });
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
      }
    });

  }
  getStoredState(e, path) {
    e.preventDefault();
    var req = request.post('/state');
    req.field('appStatePath', path);

    req.end((err, res) => {
      err?console.log(err):'';//console.log('response: ', res.body);
      this.props.updateState(JSON.parse(res.body));
    });
  }
  render() {
    return (
      <div id='Controls' className="flex-it flex-col controls">
        <label className="text-right">
          ProdName:
          <input ref="prodName" defaultValue={this.props.prodInfo.prodName}/>
        </label>
        <label className="text-right">
          ProdId:
          <input ref="prodId" defaultValue={this.props.prodInfo.prodId}/>
        </label>
        <div className="flex-it flex-justify-around">
          <label>Export Results? <input type="checkbox" ref="checker" defaultChecked={false}/></label>
          <button onClick={() => this.save()}>Save</button>
        </div>
        <div className="available">
          <h4>Restore previous product:</h4>
          <ul>
            {this.state.available.map((item, i) => (
              <li key={i}>
                <a href={item} onClick={(e) => this.getStoredState(e, item)}>{item.split('/')[0]}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}


Controls.propTypes = {
  appState: React.PropTypes.object.isRequired,
  updateState: React.PropTypes.func.isRequired,
  prodInfo: React.PropTypes.object.isRequired
};

export default Controls;
