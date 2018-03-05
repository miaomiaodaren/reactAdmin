import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import home from './components/home/index'
import news from './components/news/index'

import Sidebar from './components/home/left'
import TopCompont from './components/home/top'
import User from './components/users/index'
import Blog from './components/blog/index'
import BlogEdit from './components/blog/blogedit'
import JavaList from './components/javalist/index'
import Books from './components/books/book'
import Lineage from './components/javalist/lineage'

class App extends React.Component {
    constructor(props: any) {
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
                        <Route path="/lineage/:name" component={Lineage} />
                        <Route path="/" exact component={home} />
                         {/*<Route path="/:type" component={news} /> */}
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;