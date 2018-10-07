import '../node_modules/semantic-ui/dist/semantic.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.$ = window.jQuery = require('jquery')
require('../node_modules/semantic-ui/dist/semantic.min.js')

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
