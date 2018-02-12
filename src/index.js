import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store from './store';
// import { store, persistor } from './store';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

////persistor={persistor}

ReactDOM.render(
    <Provider store={store}>
        {/* <PersistGate>  */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        {/* </PersistGate> */}
    </Provider>, document.getElementById('root'));

