import './index';
import 'normalize.css';
import 'font-awesome/less/font-awesome.less';
import ReactDom from 'react-dom';
import React from 'react';
import App from './main';

let container = document.getElementById('app');
ReactDom.render(<App/>, container);
