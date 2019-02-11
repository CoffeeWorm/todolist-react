import './index.less';
import 'antd/lib/message/style';

import React from 'react';
import NavBar from '@/nav';
import Header from '@/header';
import Setter from '@/set-item';
import Todo from '@/todo-list';
import Footer from '@/footer';
import 'moment/locale/zh-cn';
import message from 'antd/lib/message';
import moment from 'moment';

moment.locale('zh-cn');

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getStateInit(),
      todoList: [],
      tipTitle: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onModify = this.onModify.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDel = this.onDel.bind(this);
  }
  onChange(obj) {
    this.setState(obj);
  }
  onModify(id) {
    let todo = this.find(id);
    if (!todo) {
      return;
    }
    Object.assign(this.state, todo);
    this.setState(this.state);
  }
  onDel(id) {
    this.setState({
      todoList: this.state.todoList.filter(item => item.id !== id)
    });
    message.success('删除成功！');
  }
  getStateInit(){
    return {
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss'),
      intro: '',
      detail: '',
      id: +new Date(),
      isFinish: false
    };
  }
  onStatusChange(id) {
    let todo = this.find(id);
    if (!todo) {
      return;
    }

    todo.isFinish = !todo.isFinish;
    this.setState(this.state.todoList);
    message.success(todo.isFinish? '终于完成了呢！': '小子，你怎么又把它拉回去？');
  }
  onClear() {
    this.setState({
      todoList: []
    });
    message.success('清除成功！');
  }
  find(id, array = this.state.todoList) {
    return array.find(item => item.id == id);
  }
  init() {
    this.setState(this.getStateInit());
  }
  onSave() {
    let { date, time, intro, detail, isFinish, todoList, id } = this.state,
      todo = {
        date,
        time,
        intro,
        detail,
        id: id || +new Date(),
        isFinish
      },
      todoItem = this.find(id);
    if (!intro) {
      message.error('请输入Todo信息！');
      return;
    }
    if (todoItem) {
      Object.assign(todoItem, todo);
    } else {
      todoList.push(todo);
    }
    this.setState({ todoList });
    this.init();
    message.success('保存成功！')
  }
  render() {
    let unfinish = this.state.todoList.filter(item => !item.isFinish);
    let finish = this.state.todoList.filter(item => item.isFinish);
    return (
      <div>
        <NavBar />
        <Header />
        <div className="g-content">
          <Setter
            {...this.state}
            onChange={this.onChange}
            onSave={this.onSave}
          />
          <Todo
            todoList={unfinish}
            onChange={this.onChange}
            onModify={this.onModify}
            onDel={this.onDel}
            onStatusChange={this.onStatusChange}
          />
          <Todo
            todoList={finish}
            onChange={this.onChange}
            finish
            onModify={this.onModify}
            onDel={this.onDel}
            onStatusChange={this.onStatusChange}
          />
        </div>
        <Footer onClear={this.onClear} />
      </div>
    );
  }
}

export default TodoList;
