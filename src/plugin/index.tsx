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
                {name: '进度条', url: 'progress'},
                {name: '三级联动', url: 'select'},
                // {name: '编辑器', url: 'edit'}, 
                {name: '文件上传', url: 'upload'},
                {name: '弹出层', url: 'modal'},
                {name: '文字打印效果', url: 'textwrite'},
                {name: '返回顶部', url: 'scrollToTop'},
                {name: '距边悬浮', url: 'sticky'},
                {name: '联级选择框', url: 'cascader'},
                {name: '日期时间选择框', url: 'datepicker'},
                {name: '倒计时', url: 'CountDown'},
                {name: '按钮开关', url: 'Switch'},
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
        const asyncLoadRoute = (pathName: string) => require(`./${pathName}`);
        return (
            <div id="plugin_main">
                {liEach()}
                <Route path="/plugin/:name" component={asyncComponent(() => asyncLoadRoute(ispath))}></Route>
            </div>
        )
    }
}

export default Plugin