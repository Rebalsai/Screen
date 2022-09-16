import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import '../src/assets/css/framework.css';
import '../src/assets/css/styles.css';
import '../src/assets/css/dark-theme.css';
import '@progress/kendo-theme-default/dist/all.css';
import IdleCmp from './auth/idle.component';
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <IdleCmp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
