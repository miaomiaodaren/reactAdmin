import * as React from 'react';
import { Switch, Route, Link, HashRouter as Router, } from 'react-router-dom'


import news from './components/news/index'

import Sidebar from './components/home/left'
import TopCompont from './components/home/top'
// import User from './components/users/index'
import Blog from './components/blog/index'
import BlogEdit from './components/blog/blogedit'
// import JavaList from './components/javalist/index'
import Books from './components/books/book'
// import Lineage from './components/javalist/lineage'

import { Provider } from 'react-redux';
import rootReducer from './model/reducers/index'
import { createStore } from 'redux';
const store = createStore(rootReducer);
import routes from './routes';

import { hot } from 'react-hot-loader';

{/* <Provider store={store}>
//         <Router history={history}>
//             <Switch>
//                 {/* <Route path="/login" component={Login} /> */}
//                 <Route exact path="/" component={App} />
//                 <Route path="/:type" component={App} />
//             </Switch>
//         </Router>
//     </Provider>, */}


class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Sidebar />
                        <TopCompont />
                        <div id="main_right">
                            {routes.map(route => (
                                <Route path={route.path} key={route.path} component={route.body} />
                            ))}
                        </div>
                    </div>
                </Router>
            </Provider>



            // <div className="App">
            //     <Sidebar />
            //     <TopCompont />
            //     <div id="main_right">
            //         <Switch>
            //             <Route path="/news" exact component={news} />
            //             {/* <Route path="/user" component={User} /> */}
            //             <Route path="/blog" component={Blog} />
            //             <Route path="/books" component={Books} />
            //             <Route path="/blogedit" exact component={BlogEdit} />
            //             <Route path="/blogedit/:id" component={BlogEdit} />
            //             {/* <Route path="/JavaList" component={JavaList} />
            //             <Route path="/lineage/:name" component={Lineage} /> */}
            //             <Route path="/" exact component={home} />
            //              {/*<Route path="/:type" component={news} /> */}
            //         </Switch>
            //     </div>
            // </div>
        )
    }
}

export default hot(module)(App)