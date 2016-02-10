import React, {Component} from 'react';

import Mode from './Mode';

export default class Modes extends Component {
  render() {
    return (
      <section>
        <div className="flex-it flex-wrap flex-row overview modes">
          {this.props.modes.map((mode, i) => (
            <Mode
              /*updateState={this.props.updateState}
              allModes={this.props.modes}
              heading={mode.heading}
              text={mode.text}*/
              {...this.props}
              index={i}
              key={i} />
          ))}
        </div>
        <p>&nbsp;</p>
      </section>
    )
  }
}

Modes.propTypes = {
  updateState: React.PropTypes.func.isRequired,
  modes: React.PropTypes.array.isRequired
}

export default Modes;
