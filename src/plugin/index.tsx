import * as React from 'react'
import { Link, Router, Route, Switch } from 'react-router-dom';
import { Copy } from './copy/index'

class Plugin extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
    }
    render() {
        console.info(this.props);
        return (
            <div>
                <ul>
                    <li><Link to='/plugin/copy'>1.复制文本到剪贴板功</Link></li>
                </ul>
                <Route path="/plugin/:name" component={Copy}></Route>
            </div>
        )
    }
}

export default Plugin