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
import Errors from './components/404';
import Home from './components/home/index'
import Login from './components/login'


const isLogin = () => {
    const token = sessionStorage.getItem('token');
    return !!token
}

const PrivateRoute = ({component: Component, ...rest}: any) => {
    return (
        <Route exact {...rest} render={ props =>
            isLogin() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: props.location }
                    }}
                />
            )
        }/>
    )
} 

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        sessionStorage.setItem('token', '222');
        return (
            <Provider store={store}>
                <Router history={bhistory}>
                    <div className="App">
                        <Sidebar />
                        <TopCompont />
                        <div id="main_right">
                            <Switch>
                                {routes.map(route => (
                                    <PrivateRoute path={route.path} key={route.path} component={route.body()} />
                                ))}
                                <Route path='/login' key='/login' component={Login} />
                                <Route component= {Errors}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default hot(module)(App)
