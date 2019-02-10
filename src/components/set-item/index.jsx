import './index.less';
import React, { Component } from 'react';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import 'antd/lib/input/style';
import 'antd/lib/date-picker/style';
import 'antd/lib/time-picker/style';

export default class Setter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: 'block'
    };
    this.showDetail = true;
    this.changeHanlder = this.changeHanlder.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }
  changeHanlder(e) {
    console.log(e);
    let tar = e.target;
    // switch(tar.className) {
    //   case 'intro':
    //   break;
    //   case 'date':
    //   break;
    //   case 'time':
    //   break;
    //   case 'detail':
    //   break;
    //   default:
    //   break;
    // }
    console.log(tar.value);
  }
  clickHandler(e) {
    console.log(e);
    let tar = e.target;
    if (!/^fa fa-chevron-/.test(tar.className)) {
      return;
    }
    if (this.showDetail) {
      this.setState({ showDetail: 'none' });
    } else {
      this.setState({ showDetail: 'block' });
    }
    this.showDetail = !this.showDetail;
  }
  render() {
    return (
      <div
        className="m-setter"
        onChange={this.changeHanlder}
        onClick={this.clickHandler}
      >
        <h5 className="title">到底干啥呢？</h5>
        <Input type="text" className="intro" />
        <i className="fa fa-chevron-up" />
        <div className="content" style={{ display: this.state.showDetail}}>
          <DatePicker className="date" onChange={this.changeHanlder}/>
          <TimePicker className="time" onChange={this.changeHanlder}/>
          <Input.TextArea className="detail" />
        </div>
      </div>
    );
  }
}
