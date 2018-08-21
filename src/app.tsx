import * as React from 'react';
import { Switch, Route, Link, Router, Redirect } from 'react-router-dom'
import news from './components/news/index'
import { Provider } from 'react-redux';
import rootReducer from './model/reducers/index'
import { createStore } from 'redux';
const store = createStore(rootReducer);
import bhistory from './util/history';
import { hot } from 'react-hot-loader';
import Home from './components/home/index'
import Login from './components/login'

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        // sessionStorage.setItem('token', '222');
        return (
            <Provider store={store}>
                <Router history={bhistory}>
                    <div className="App">
                        <Switch>
                            <Route path='/login' key='/login' component={Login} />
                            <Route path='/' key='home' component={Home} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default hot(module)(App)
