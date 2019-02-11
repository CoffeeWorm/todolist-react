import './index.less';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import React, { Component } from 'react';
import Input from 'antd/lib/input';
import moment from 'moment';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false
    };
    this.className = 'fa-chevron-up';
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  clickHandler(e) {
    let tar = e.target,
      className = tar.className;
    switch (true) {
      case /fa fa-wrench/.test(className):
        this.props.onModify(this.props.id);
        break;
      case /fa fa-chevron-/.test(className):
        this.className = this.state.showDetail
          ? 'fa-chevron-up'
          : 'fa-chevron-down';
        this.setState({
          showDetail: !this.state.showDetail
        });
        break;
      case /fa fa-trash/.test(className):
        this.props.onDel(this.props.id);
      default:
        break;
    }
  }
  changeHandler(e) {
    e.stopPropagation();
    this.props.onStatusChange(this.props.id);
  }
  render() {
    return (
      <li className="m-todo" onClick={this.clickHandler}>
        <Input
          className="switcher"
          type="checkbox"
          checked={this.props.finish}
          onChange={this.changeHandler}
        />
        <span className="intro">{this.props.intro}</span>
        <i className={`fa ${this.className}`} />
        <i className="fa fa-wrench" />
        <i className="fa fa-trash" />
        <div
          className="content"
          style={{ display: this.state.showDetail ? 'block' : 'none' }}
        >
          <p
            className="detail"
            style={{ display: this.props.detail ? 'block' : 'none' }}
          >
            {this.props.detail}
          </p>
          <p className="time">
            {`${this.props.date} 
              ${this.props.time}`}
          </p>
        </div>
      </li>
    );
  }
}

export default Todo;
