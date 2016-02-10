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


export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
  }
  updateState(obj) {
    // @see lodash _.set https://lodash.com/docs#set
    this.setState(obj, () => console.log(this.state));
    //set(this.state, path, value);
  }
  getFromState(path, defaultValue=null) {
    // not sure if we'll need this
    // @see lodash _.get https://lodash.com/docs#get
    //get(this.state, path, defaultValue);
  }
  render() {
    return (
      <div id='Content' className="flex-it flex-col landing-content">
        <Controls prodInfo={this.state.prodInfo} updateState={(obj) => this.updateState(obj)}/>
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
