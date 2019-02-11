import './index.less';
import React, { Component } from 'react';
import { ls } from '../localstorage/ls';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(e) {
    e.stopPropagation();
    ls.clear();
    this.props.onClear();
  }
  render() {
    return (
      <footer className="m-footer">
        CoffeeWorm
        <span className="clear" onClick={this.clickHandler}>
          clear
        </span>
      </footer>
    );
  }
}
