import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Fundament from "./Components/Fundament/Fundament"
import './bootstrap';

import { Provider } from 'react-redux';
import store from "./store";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Fundament />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root-appoint')
);
