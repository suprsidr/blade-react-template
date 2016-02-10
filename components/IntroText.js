import React, {Component} from 'react';
import Toolbar from './Toolbar';

class IntroText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }
  save() {
    this.props.updateState({
      introText: {
        heading: this.refs.heading.value,
        text: this.refs.text.value,
        videoId: this.refs.videoId.value
      }
    });
    this.toggleEditing();
  }
  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    });
    return false;
  }
  renderItemOrEdit() {
    if (this.state.editing) {
      return(<section className="intro-text">
        <div className="flex-it flex-col controls">
          <label>
            Heading:
            <input ref="heading" defaultValue={this.props.heading}/>
          </label>
          <label>
            Text:
            <textarea ref="text" defaultValue={this.props.text}></textarea>
          </label>
          <label>
            VideoId:
            <input ref="videoId" defaultValue={this.props.videoId}/>
          </label>
          <button className="saver" onClick={() => this.save()}>Save</button>
        </div>
      </section>)
    } else {
      return <section className="intro-text editable-item">
        <h4>{this.props.heading}</h4>
        <h5 className="mainSubDesc">{this.props.text}</h5>
        <p>&nbsp;</p>
        {(this.props.videoId && this.props.videoId !== '') && <a className="cam_btn qx350_video" href="#">View Video</a>}
        {(this.props.videoId && this.props.videoId !== '') && <div className="featVideo" style={{display: 'none'}}>
          <div className="videoWrapper">
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${this.props.videoId}`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>}
        <Toolbar onClick={() => this.toggleEditing()}/>
      </section>
    }
  }
  render() {
    return this.renderItemOrEdit();
  }
}

IntroText.propTypes = {
  updateState: React.PropTypes.func.isRequired,
  heading: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  videoId: React.PropTypes.string.isRequired
};

export default IntroText;
