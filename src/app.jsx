import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import home from './components/home/index.js'
import news from './components/news/index.js'

import Sidebar from './components/home/left.jsx'
import TopCompont from './components/home/top.jsx'
import User from './components/users/index.jsx'
import Blog from './components/blog/index.jsx'
import BlogEdit from './components/blog/blogedit.jsx'
import JavaList from './components/javalist/index.jsx'
import Books from './components/books/book.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="App">
                <Sidebar />
                <TopCompont />
                <div id="main_right">
                    <Switch>
                        <Route path="/news" exact component={news} />
                        <Route path="/user" component={User} />
                        <Route path="/blog" component={Blog} />
                        <Route path="/books" component={Books} />
                        <Route path="/blogedit" exact component={BlogEdit} />
                        <Route path="/blogedit/:id" component={BlogEdit} />
                        <Route path="/JavaList" component={JavaList} />
                        <Route path="/" exact component={home} />
                         {/*<Route path="/:type" component={news} /> */}
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;