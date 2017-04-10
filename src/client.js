import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './components/app.js';
import store from './components/store.js'

ReactDOM.render(
	<Provider store = {store}>
  		<App/>
  	</Provider>,
  document.getElementById('root')
);
