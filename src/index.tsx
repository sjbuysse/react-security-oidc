import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/tailwind.generated.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { appReducer, featureKey as appFeature } from './state/reducer';

const store = configureStore({
    reducer: {
        [appFeature]: appReducer
    }
})
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

