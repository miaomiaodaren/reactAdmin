import * as React from 'react';
import { Switch, Route, Link, Router, Redirect } from 'react-router-dom'
import news from './components/news/index'

import Sidebar from './components/home/left'
import TopCompont from './components/home/top'

import { Provider } from 'react-redux';
import rootReducer from './model/reducers/index'
import { createStore } from 'redux';
const store = createStore(rootReducer);
import routes from './routes';

import bhistory from './util/history';

import { hot } from 'react-hot-loader';

import Home from './components/home/index'

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Router history={bhistory}>
                    <div className="App">
                        <Sidebar />
                        <TopCompont />
                        <div id="main_right">
                            <Switch>
                                {routes.map(route => (
                                    <Route path={route.path} key={route.path} component={route.body()} />
                                ))}
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default hot(module)(App)
