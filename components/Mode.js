import React, {Component} from 'react';
import Toolbar from './Toolbar';

class Mode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }
  save() {
    const arr = this.props.modes.slice();
    arr[this.props.index] = {
      heading: this.refs.heading.value,
      text: this.refs.text.value
    };
    this.props.updateState({
      modes: arr
    });
    this.toggleEditing();
  }
  deleteItem() {
    const arr = this.props.modes.slice();
    if(arr.length === 1) return;
    arr.splice([this.props.index], 1);
    this.props.updateState({
      modes: arr
    });
  }
  addItem() {
    const arr = this.props.modes.slice();
    if(arr.length === 4) return;
    arr.push(arr[0]);
    this.props.updateState({
      modes: arr
    });
  }
  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    });
    return false;
  }
  renderItemOrEdit() {
    const mode = this.props.modes[this.props.index];
    if (this.state.editing) {
      return(<div className="flex-item-auto text-center">
        <div className="flex-it flex-col controls">
          <label>
            <input ref="heading" defaultValue={mode.heading}/>
          </label>
          <label>
            <textarea ref="text" defaultValue={mode.text}/>
          </label>
          <button className="saver" onClick={() => this.save()}>Save</button>
        </div>
      </div>)
    } else {
      return <div className="flex-item-auto editable-item">
        <strong>{mode.heading}</strong>
        <p>{mode.text}</p>
        {this.props.updateState && <Toolbar onClick={() => this.toggleEditing()} onDelete={() => this.deleteItem()} onAdd={() => this.addItem()}/>}
      </div>
    }
  }
  render() {
    return this.renderItemOrEdit();
  }
}

Mode.propTypes = {
  updateState: React.PropTypes.func,
  modes: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired
};

export default Mode;
