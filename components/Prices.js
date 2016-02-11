import React, {Component} from 'react';
import PriceBox from './PriceBox';

class Prices extends Component {
  render() {
    return (
      <section>
        <div className="flex-it flex-wrap" id="chart">
          {this.props.prices.map((item, i) => (
            <PriceBox
              {...this.props}
              index={i}
              key={i} />
          ))}
        </div>
      </section>
    )
  }
}

Prices.propTypes = {
  updateState: React.PropTypes.func,
  prices: React.PropTypes.array.isRequired
}

export default Prices;
