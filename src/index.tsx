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

import './main.less'
import 'antd/dist/antd.less'

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

// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={history}>
//             <Switch>
//                 {/* <Route path="/login" component={Login} /> */}
//                 <Route exact path="/" component={App} />
//                 <Route path="/:type" component={App} />
//             </Switch>
//         </Router>
//     </Provider>,
//     document.getElementById('app')
// );
// ReactDOM.render(<App />, document.getElementById('app'));
