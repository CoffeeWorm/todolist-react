import './index.less';
import React from 'react';
import NavBar from '@/nav';
import Header from '@/header';
import Setter from '@/set-item';

class TodoList extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <NavBar/>
        <Header/>
        <Setter/>
      </div>
    );
  }
}

export default TodoList;