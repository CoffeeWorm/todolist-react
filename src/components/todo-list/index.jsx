import './index.less';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import React, { Component } from 'react';
import Todo from '../todo-item';

class TodoList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { onModify, onDel, onStatusChange, finish } = this.props,
      todos = this.props.todoList.map(item => {
        let props = {
          onModify,
          onDel,
          onStatusChange,
          finish,
          ...item
        };
        return <Todo key={item.id} {...props} />;
      });

    return (
      <div className="m-todo-list">
        <h3>{this.props.finish ? '下面的都干完啦！' : '看看你还要干点啥'}</h3>
        <ul
          className="todo-list"
          // style={{ display: this.props.todoList.length !== 0 ? 'blobk' : 'none' }}
        >
          {todos}
        </ul>
        {/* <div
          className="todo-list-none-tip"
          style={{ display: this.props.todoList.length !== 0 ? 'none' : 'blobk' }}
        >
          好像没有哦~
        </div> */}
      </div>
    );
  }
}

export default TodoList;
