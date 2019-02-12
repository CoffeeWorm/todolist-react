import './index';
import 'normalize.css';
import 'font-awesome/less/font-awesome.less';
import ReactDom from 'react-dom';
import React from 'react';
import App from './main';

if (/(android|ios|blackberry|ipad|iphone|ipod)/i.test(navigator.userAgent)) {
  document.write(
    '<h1 style="display: flex; align-items: center; justify-content: center; position: absolute; width: 100%; height: 100%;">不支持手机使用哦~</h1>'
  );
} else {
  let container = document.getElementById('app');
  ReactDom.render(<App />, container);
}
