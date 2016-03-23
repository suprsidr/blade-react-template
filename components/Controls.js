import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import request from 'superagent';
import OutputTemplate from './OutputTemplate';

export default class Controls extends Component {
  constructor (props) {
    super(props);
    this.state = {
      available: [],
      prodInfo: this.props.appState.prodInfo
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
  componentWillReceiveProps(nextProps) {
    this.setState({
      prodInfo: nextProps.appState.prodInfo
    }, () => {
      this.refs.prodName.value = this.state.prodInfo.prodName;
      this.refs.prodId.value = this.state.prodInfo.prodId;
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
          <input ref="prodName" defaultValue={this.state.prodInfo.prodName}/>
        </label>
        <label className="text-right">
          ProdId:
          <input ref="prodId" defaultValue={this.state.prodInfo.prodId}/>
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
        <div className="available">
          <h4>Restore previous state:</h4>
          <ul>
            {this.props.stateLog.map((item, i) => (
              <li key={i}>
                <a href={item.time} onClick={(e) => {e.preventDefault(); this.props.updateState(item.state, null, i)}}>{item.time}</a>
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
  stateLog: React.PropTypes.array.isRequired,
  updateState: React.PropTypes.func.isRequired
};

export default Controls;
