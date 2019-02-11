import './index.less';
import React, { Component } from 'react';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import Button from 'antd/lib/button';
import moment from 'moment';
import 'antd/lib/input/style';
import 'antd/lib/date-picker/style';
import 'antd/lib/time-picker/style';

export default class Setter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: 'none',
      toggleIconClass: 'fa fa-chevron-up'
    };
    this.showDetail = false;
    this.changeHanlder = this.changeHanlder.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
    this.timeChangeHandler = this.timeChangeHandler.bind(this);
  }
  dateChangeHandler(date, datestr) {
    this.props.onChange({ date: datestr });
  }
  timeChangeHandler(time, timestr) {
    this.props.onChange({ time: timestr });
  }
  changeHanlder(e) {
    let tar = e.target,
      className = tar.className;
    switch (true) {
      case /intro/.test(className):
        this.props.onChange({
          intro: tar.value
        });
        break;
      case /detail/.test(className):
        this.props.onChange({
          detail: tar.value
        });
        break;
      default:
        break;
    }
  }
  clickHandler(e) {
    let tar = e.target;
    switch (true) {
      case /fa fa-chevron-/.test(tar.className): {
        if (this.showDetail) {
          this.setState({
            showDetail: 'none',
            toggleIconClass: 'fa fa-chevron-up'
          });
        } else {
          this.setState({
            showDetail: 'block',
            toggleIconClass: 'fa fa-chevron-down'
          });
        }
        this.showDetail = !this.showDetail;
        break;
      }
      case /save/.test(tar.className):
        this.props.onSave();
        break;
    }
  }
  render() {
    return (
      <div
        className="m-setter"
        onChange={this.changeHanlder}
        onClick={this.clickHandler}
      >
        <h3 className="title">到底要干啥呢？</h3>
        <Input type="text" className="intro" value={this.props.intro} />
        <Button className="save">保存</Button>
        <i className={`toggle ${this.state.toggleIconClass}`} />
        <div className="content" style={{ display: this.state.showDetail }}>
          <Input.TextArea className="detail" value={this.props.detail} />
          <DatePicker
            className="date"
            onChange={this.dateChangeHandler}
            allowClear={false}
            value={moment(this.props.date, 'YYYY-MM-DD')}
            format={'YYYY-MM-DD'}
          />
          <TimePicker
            className="time"
            allowClear={false}
            onChange={this.timeChangeHandler}
            value={moment(this.props.time, 'HH:mm:ss')}
            format={'HH:mm:ss'}
          />
        </div>
      </div>
    );
  }
}
