import React, {Component} from 'react';

class Toolbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span className={`toolbar${this.props.miniclass}`}>
        {this.props.onDelete && <a title="Delete" href="#edit" className="edit-icon-link" onClick={() => this.props.onDelete()}>
          <svg className="icon icon-edit"><use xlinkHref="#icon-minus"/></svg>
        </a>}
        {this.props.onAdd && <a title="Add" href="#edit" className="edit-icon-link" onClick={() => this.props.onAdd()}>
          <svg className="icon icon-edit"><use xlinkHref="#icon-plus"/></svg>
        </a>}
        <a title="Edit" href="#edit" className="edit-icon-link" onClick={() => this.props.onClick()}>
          <svg className="icon icon-edit"><use xlinkHref="#icon-pencil"/></svg>
        </a>
      </span>
    )
  }
}

Toolbar.defaultProps = {
  miniclass: ''
}

export default Toolbar;
