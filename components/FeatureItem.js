import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import Toolbar from './Toolbar';

class FeatureItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }
  onDrop(files) {
    //console.log('Received files: ', files);
    //this.refs.featureImage.style.maxWidth = '348px';
    //this.refs.featureImage.src = files[0].preview;
    const feature = this.props.features[this.props.index];
    const req = request.post('/uploads');
    files.forEach((file) => {
      req
        .field('imageName', 'feature')
        .field('productName', this.props.prodName)
        .attach('feature', file, 'feature-' + (this.props.index + 1) +'.jpg');
    });
    req.end((err, res) => {
      err?console.log(err):console.log(res);
      const arr = this.props.features.slice();
      arr[this.props.index] = {
        heading: feature.heading,
        text: feature.text,
        img: res.body.path
      }
      this.props.updateState({
        features: arr
      });
    });
  }
  save() {
    const feature = this.props.features[this.props.index];
    const arr = this.props.features.slice();
    arr[this.props.index] = {
      heading: this.refs.heading.value,
      text: this.refs.text.value,
      img: feature.img
    }
    this.props.updateState({
      features: arr
    });
    this.toggleEditing();
  }
  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    });
    return false;
  }
  deleteItem() {
    const arr = this.props.features.slice();
    if(arr.length === 1) return;
    arr.splice([this.props.index], 1);
    this.props.updateState({
      features: arr
    });
  }
  addItem() {
    const arr = this.props.features.slice();
    arr.push(arr[0]);
    this.props.updateState({
      features: arr
    });
  }
  renderItemOrEdit() {
    const feature = this.props.features[this.props.index];
    if (this.state.editing) {
      return(<div className="flex-item-auto text-center">
        <div className="flex-it flex-col controls">
          <label>
            <input ref="heading" defaultValue={feature.heading}/>
          </label>
          <label>
            <textarea ref="text" defaultValue={feature.text}></textarea>
          </label>
          <button className="saver" onClick={() => this.save()}>Save</button>
        </div>
      </div>)
    } else {
      return <div className="flex-item-auto text-center editable-item">
        <h4 className="center-txt"><strong>{feature.heading}</strong></h4>
        <p>{feature.text}</p>
        <Toolbar onClick={() => this.toggleEditing()} onDelete={() => this.deleteItem()} onAdd={() => this.addItem()}/>
      </div>
    }
  }
  render() {
    const feature = this.props.features[this.props.index];
    return (
      <div className="flex-it flex-wrap">
        {this.renderItemOrEdit()}
        <div className="flex-item-auto text-center feature-image">
          <img ref="featureImage" src={feature.img} alt={feature.heading} />
          <Dropzone className="dropzone" onDrop={(files) => this.onDrop(files)} style={{height: '295px'}} />
        </div>
      </div>
    )
  }
}


FeatureItem.propeTypes = {
  updateState: React.PropTypes.func.isRequired,
  features: React.PropTypes.array.isRequired,
  prodName: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired
}

export default FeatureItem;
