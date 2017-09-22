import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import Cards from './Cards';
import registerServiceWorker from './registerServiceWorker';
 global.jQuery = require('jquery');
require('bootstrap')

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Cards />, document.getElementById('cards'));
registerServiceWorker();
