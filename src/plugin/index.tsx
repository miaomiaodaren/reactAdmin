import * as React from 'react'
import { Link, Router, Route, Switch } from 'react-router-dom';
import asyncComponent from '../util/asyncComponent'

class Plugin extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            List: [
                {name: '复制文本到剪贴板功', url: 'copy'},
                {name: '单选框', url: 'radio'},
                {name: '评分', url: 'rate'},
                // {name: '图片上传', url: 'upload'},
                // {name: '联级选择框', url: 'cascader'},
                // {name: '文本输入框', url: 'input'},
                // {name: '图片轮播', url: 'swipt'},
            ]
        }
        this.liEach = this.liEach.bind(this);
    }
    liEach () {
        const {List} = this.state;
        let menu:any[] = [];
        List.forEach((v:any, i: Number) => {
            menu.push(<li key={ v.url }><Link to={`/plugin/${v.url}`}>{Number(i) + 1}{v.name}</Link></li>)
        })
        return (<ul>{menu}</ul>)
    }
    render() {
        const { liEach } = this;
        let ispath = this.props.location.pathname.split('/')[2];
        const asyncLoadRoute = (pathName: string) => import(`./${pathName}`);
        return (
            <div id="plugin_main">
                {liEach()}
                <Route path="/plugin/:name" component={asyncComponent(() => asyncLoadRoute(ispath))}></Route>
            </div>
        )
    }
}

export default Plugin