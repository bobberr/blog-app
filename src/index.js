import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
require('./style.scss');
require('bootstrap-loader');


ReactDOM.render(<App/>, document.getElementById('app'));