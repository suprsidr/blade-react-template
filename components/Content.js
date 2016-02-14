import React, {Component} from 'react';

import Hero from './Hero';
import IntroText from './IntroText';
import SafeTech from './SafeTech';
import DividerImage from './DividerImage';
import Modes from './Modes';
import Features from './Features';
import Prices from './Prices';
import SupportLinks from './SupportLinks';
import Controls from './Controls';

import InitialState from './InitialState';


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
    this.stateLog = [{time: this.getTimeStamp(), state: InitialState}];
  }
  updateState(obj, cb, idx) {
    this.stateLog.push({time: this.getTimeStamp(), state: this.state});
    idx && (this.stateLog = this.stateLog.slice(0, idx));
    this.setState(obj, () => {
      cb && cb();
      console.log(this.state);
    });
  }
  getTimeStamp() {
    const x = new Date();
    return `${x.toDateString()}, ${x.getMinutes()}:${x.getSeconds()}`;
  }
  render() {
    return (
      <div id='Content' className="flex-it flex-col landing-content">
        <Controls appState={this.state} stateLog={this.stateLog} updateState={(obj, cb, idx) => this.updateState(obj, cb, idx)}/>
        <Hero img={this.state.hero.img} alt={this.state.hero.alt} prodName={this.state.prodInfo.prodName} updateState={(obj) => this.updateState(obj)}/>
        <IntroText heading={this.state.introText.heading} text={this.state.introText.text} videoId={this.state.introText.videoId} updateState={(obj) => this.updateState(obj)}/>
        <SafeTech heading={this.state.safeTech.heading} text={this.state.safeTech.text} updateState={(obj) => this.updateState(obj)}/>
        <DividerImage dividerImages={this.state.dividerImages} prodName={this.state.prodInfo.prodName} index={0} updateState={(obj) => this.updateState(obj)}/>
        <Modes modes={this.state.modes} updateState={(obj) => this.updateState(obj)}/>
        <DividerImage dividerImages={this.state.dividerImages} prodName={this.state.prodInfo.prodName} index={1} updateState={(obj) => this.updateState(obj)}/>
        <Features features={this.state.features} prodName={this.state.prodInfo.prodName} updateState={(obj) => this.updateState(obj)}/>
        <DividerImage dividerImages={this.state.dividerImages} prodName={this.state.prodInfo.prodName} index={2} updateState={(obj) => this.updateState(obj)}/>
        <Prices prices={this.state.prices} updateState={(obj) => this.updateState(obj)}/>
        <SupportLinks prodName={this.state.prodInfo.prodName} prodId={this.state.prodInfo.prodId} updateState={(obj) => this.updateState(obj)}/>
        <DividerImage dividerImages={this.state.dividerImages} prodName={this.state.prodInfo.prodName} index={3} updateState={(obj) => this.updateState(obj)}/>
      </div>
    )
  }
}

export default Content;
