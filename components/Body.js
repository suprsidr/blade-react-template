import React, {Component} from 'react';

import Content from './Content';

export default class Body extends Component {
  render() {
    return (
      <div id='Body' className='flex-it flex-column page-content'>
        <Content />
      </div>
    )
  }
}
