import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './model/reducers/index.js'
import {
    Route,
    Router,
    HashRouter,
    Link,
    hashHistory,
    Switch,
    BrowserRouter
} from 'react-router-dom'

import createHistory from 'history/createHashHistory'; // createBrowserHistory
const history = createHistory();
const store = createStore(rootReducer);


import './main.less'
import 'antd/dist/antd.less'

import Home from 'components/home/index'
import Login from 'components/login/index.jsx'
import App from './app.jsx'

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/" component={App} />
                <Route exact path="/:type" component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('app')
);