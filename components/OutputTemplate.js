import React from 'react'
import Hero from './Hero';
import IntroText from './IntroText';
import SafeTech from './SafeTech';
import DividerImage from './DividerImage';
import Modes from './Modes';
import Features from './Features';
import Prices from './Prices';
import SupportLinks from './SupportLinks';

import InitialState from './InitialState';

class OutputTemplate extends React.Component {
  constructor (props) {
    super(props);
    this.state = InitialState;
  }

  render () {
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1'/>
          <link rel='stylesheet' href='/css/style.css' />
          <link rel='stylesheet' href='/css/custom.css' />
          <title>Test</title>
        </head>
        <body>
          <div id='Content' className="flex-it flex-col landing-content">
            <Hero img={this.state.hero.img} alt={this.state.hero.alt} prodName={this.state.prodInfo.prodName}/>
            <IntroText heading={this.state.introText.heading} text={this.state.introText.text} videoId={this.state.introText.videoId}/>
            <SafeTech heading={this.state.safeTech.heading} text={this.state.safeTech.text}/>
            <DividerImage dividerImages={this.state.dividerImages} prodName={this.state.prodInfo.prodName} index={0}/>
            <Modes modes={this.state.modes}/>
            <DividerImage dividerImages={this.state.dividerImages} prodName={this.state.prodInfo.prodName} index={1}/>
            <Features features={this.state.features} prodName={this.state.prodInfo.prodName}/>
            <DividerImage dividerImages={this.state.dividerImages} prodName={this.state.prodInfo.prodName} index={2}/>
            <Prices prices={this.state.prices}/>
            <SupportLinks prodName={this.state.prodInfo.prodName} prodId={this.state.prodInfo.prodId}/>
            <DividerImage dividerImages={this.state.dividerImages} prodName={this.state.prodInfo.prodName} index={3}/>
          </div>
          <script src="/build/bundle.min.js"></script>
        </body>
      </html>
    )
  }
}

export default OutputTemplate
