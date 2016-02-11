import React, {Component} from 'react';

import FeatureItem from './FeatureItem';

class Features extends Component {
  render() {
    return (
      <section className="features flex-it flex-col">
        {this.props.features.map((feature, i) => (
          <FeatureItem
            {...this.props}
            index={i}
            key={i} />
        ))}
      </section>
    )
  }
}

Features.propTypes = {
  updateState: React.PropTypes.func,
  features: React.PropTypes.array.isRequired,
  prodName: React.PropTypes.string.isRequired
}

export default Features;
