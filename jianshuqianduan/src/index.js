import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import {Globalstyle} from './style.js';
import { Globalstyle2 } from './statics/iconfont/iconfont';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Fragment>
      <Globalstyle/>
      <Globalstyle2/>
      <App />
    </Fragment>
    
);
