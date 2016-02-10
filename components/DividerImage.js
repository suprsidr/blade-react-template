import React, {Component} from 'react';

import Dropzone from 'react-dropzone';
import request from 'superagent';

class DividerImage extends Component {
  onDrop(files) {
    //console.log('Received files: ', files);
    //this.refs.dividerImage.style.maxWidth = '960px';
    //this.refs.dividerImage.src = files[0].preview;
    var req = request.post('/uploads');
    files.forEach((file) => {
      req
        .field('imageName', 'divider')
        .field('productName', this.props.prodName)
        .attach('divider', file, 'divider-' + (this.props.index + 1) +'.jpg');
    });
    req.end((err, res) => {
      err?console.log(err):console.log(res);
      const arr = this.props.dividerImages.slice();
      arr[this.props.index] = res.body.path;
      this.props.updateState({
        dividerImages: arr
      });
    });
  }
  render() {
    return (
      <div className="divider-image">
        {this.props.dividerImages[this.props.index] && <img ref="dividerImage" src={this.props.dividerImages[this.props.index]} alt="" />}
        <Dropzone className="dropzone" onDrop={(files) => this.onDrop(files)} style={{height: '320px'}} />
      </div>
    )
  }
}

DividerImage.propTypes = {
  updateState: React.PropTypes.func.isRequired,
  dividerImages: React.PropTypes.array.isRequired,
  prodName: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired
}

export default DividerImage;
