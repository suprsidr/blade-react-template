import React, {Component} from 'react';


class SupportLinks extends Component {
  render() {
    return (
      <section>
        <div className="flex-it">
          <div className="partsFinder flex-item-auto text-center">
            <a className="cam_btn" href={`/Products/RelatedParts.aspx?ProdID=${this.props.prodId}&Category=Parts+Listing`}>Replacement Parts</a>
          </div>
          <div className="manual flex-item-auto text-center">
            <a className="cam_btn qx350_manual pdf" href={`/ProdInfo/Files/${this.props.prodId}-Manual-EN.pdf`}>{this.props.prodName}<br />Manuals</a>
          </div>

        </div>
        <p>&nbsp;</p>
      </section>
    )
  }
}

SupportLinks.propTypes = {
  prodName: React.PropTypes.string.isRequired,
  prodId: React.PropTypes.string.isRequired
}

export default SupportLinks;
