import React, {Component} from 'react';

import Dropzone from 'react-dropzone';

import request from 'superagent';


class Hero extends Component {
  onDrop(files) {
    //console.log('Received files: ', files);
    //this.refs.heroImage.style.maxWidth = '960px';
    //this.refs.heroImage.src = files[0].preview;
    var req = request.post('/uploads');
    files.forEach((file) => {
      req
        .field('imageName', 'hero')
        .field('productName', this.props.prodName)
        .attach('hero', file, 'hero.jpg');
    });
    req.end((err, res) => {
      err?console.log(err):console.log(res);
      this.props.updateState({hero: {img: res.body.path, alt: this.props.prodName}});
    });
  }
  render() {
    return (
      <div className="glamour-image">
        <img ref="heroImage" src={this.props.img} alt={this.props.alt}/>
        {this.props.updateState && <Dropzone className="dropzone" onDrop={(files) => this.onDrop(files)} style={{height: '500px'}} />}
      </div>
    )
  }
}

Hero.propTypes = {
  updateState: React.PropTypes.func,
  img: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  prodName: React.PropTypes.string.isRequired
}

export default Hero;
