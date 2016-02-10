import React, {Component} from 'react';
import Toolbar from './Toolbar';

class SafeTech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }
  save() {
    this.props.updateState({
      safeTech: {
        heading: this.refs.heading.value,
        text: this.refs.text.value
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
  getHeading() {
    return {__html: this.props.heading}
  }
  renderItemOrEdit() {
    if (this.state.editing) {
      return(
      <div className="flex-it flex-wrap safeTech editable-item">
        <div className="flex-item-auto">
          <div className="text-center">
            <img src="http://www.bladehelis.com/Content/Images/cam/safeLogo-white.png" alt="SAFE technology" />
          </div>
        </div>
        <div className="flex-item-auto">
          <div  className="flex-it flex-col controls" style={{paddingRight: '10px'}}>
            <label>
              <input ref="heading" defaultValue={this.props.heading} style={{width: '100%'}}/>
            </label>
            <textarea ref="text" defaultValue={this.props.text} style={{width: '100%', height: '90px', padding: '5px'}}></textarea>
            <button className="saver" onClick={() => this.save()}>Save</button>
          </div>
        </div>
      </div>)
    } else {
      return <div className="flex-it flex-wrap safeTech editable-item">
      <div className="flex-item-auto">
        <div className="text-center">
          <img src="http://www.bladehelis.com/Content/Images/cam/safeLogo-white.png" alt="SAFE technology" />
        </div>
      </div>
      <div className="flex-item-auto">
        <div>
          <h4 dangerouslySetInnerHTML={this.getHeading()}/>
          <p>{this.props.text}</p>
        </div>
      </div>
      <Toolbar onClick={() => this.toggleEditing()}/>
      </div>
    }
  }
  render() {
    return this.renderItemOrEdit()
  }
}

SafeTech.propTypes = {
  updateState: React.PropTypes.func.isRequired,
  heading: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired
}

export default SafeTech;
