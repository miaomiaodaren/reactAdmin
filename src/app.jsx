import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import home from './components/home/index.js'
import news from './components/news/index.js'

import Sidebar from './components/home/left.jsx'
import TopCompont from './components/home/top.jsx'
import User from './components/users/index.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
        console.info(this.props, 44, this.props.match.params.type);
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
                        <Route path="/" exact component={home} />
                        {/* <Route path="/:type" component={news} /> */}
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;