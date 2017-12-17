import React from 'react';
import ReactDOM from 'react-dom';
// import routes from './routes.js';
import { Route, Router, HashRouter, Link, hashHistory, Switch, BrowserRouter } from 'react-router-dom'

import createHistory from 'history/createHashHistory';   // createBrowserHistory
const history = createHistory()

import './main.less'
import 'antd/dist/antd.less'

import Home from 'components/home/index'
import Login from 'components/login/index'
import App from './app.jsx'

ReactDOM.render(
    (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/" component={App} />
                <Route exact path="/:type" component={App} />
            </Switch>
        </Router>
    ),
    // <DefRouter />,
    document.getElementById('app')
);
