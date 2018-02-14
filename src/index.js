import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store from './store';
// import { store, persistor } from './store';
import './index.css';
import App from './App';

ReactDOM.render(<Provider store={store}><HashRouter><App /></HashRouter></Provider>, document.getElementById('root'));
// registerServiceWorker();
