import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import rootReducer from './model/reducers/index'
import {
    Route,
    Router,
    HashRouter,
    Link,
    Switch,
    BrowserRouter
} from 'react-router-dom'


const store = createStore(rootReducer);

import 'antd/dist/antd.less'
import './static/base.css'
import './main.less'

import Home from './components/home/index'
import App from './app'
import {AppContainer} from 'react-hot-loader';

renderWithHotReload(App);

function renderWithHotReload(RootElement: any) {
    ReactDOM.render(
        <AppContainer>
            <RootElement />
        </AppContainer>,
        document.getElementById('app')
    )
}
