/// <reference path="../../../typings/global.d.ts" />
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;   //导航的子集菜单
import * as Login from '../../static/ff.jpg';  

// @connect(
//     (state) => ({
//         changeMenu: state.changeMenu,
//     })
// )
interface PROPS {
    changeMenu?: any
}
class Sidebar extends React.Component<PROPS, {}> {
    constructor(props: any) {
        super(props);
    }
    state = {
        // collapsed: false,
        selectkey: window.location.pathname.split('/')[1] || 'index'
    }
    render() {
        //因为改成了非hash模式，所以需要使用另外的办法获取路由
        console.info(this.props, 1);
        const hasurl = window.location.pathname.split('/')[1] || '';
        const {changeMenu} = this.props;
        return (
            <div id="leftMenu" style={changeMenu.collapsed ? { maxWidth: 80, minWidth: 80, overflow: 'hidden' } : {}}>
                <div className="userInfo">
                    <img src={Login} className="userLogin"/>
                    <h3>喵喵大人</h3>
                </div>
                <Menu defaultSelectedKeys={[this.state.selectkey]} defaultOpenKeys={[hasurl]} mode="inline" theme="dark" inlineCollapsed={this.props.changeMenu.collapsed}>
                    <Menu.Item key="index">
                        <Link to="/"><span><Icon type="home" /><span>首页</span></span></Link>
                    </Menu.Item>
                    <SubMenu key="user" title={<span><Icon type="user" /><span>用户模块</span></span>}>
                        <Menu.Item key="user">
                            <Link to="/user"><span><Icon type="user" /><span>用户管理</span></span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="blog" title={<span><Icon type="idcard" /><span>博客模块</span></span>}>
                        <Menu.Item key="blog">
                            <Link to="/blog"><span><span>博客列表</span></span></Link>
                        </Menu.Item>
                    </SubMenu>
                    {/* <Menu.Item key="4">
                        <Link to="/books"><span><Icon type="exception" /><span>小说模块</span></span></Link>
                    </Menu.Item> */}
                    <Menu.Item key="5">
                        <Link to="/"><span><Icon type="shake" /><span>音乐模块</span></span></Link>
                    </Menu.Item>
                    <Menu.Item key="javalist">
                        <Link to="/javalist"><span><Icon type="smile" /><span>前端天堂</span></span></Link>
                    </Menu.Item>
                    <Menu.Item key="plugin">
                        <Link to="/plugin"><span><Icon type="smile" /><span>常用插件</span></span></Link>
                    </Menu.Item>
                    <Menu.Item key="workRecord">
                        <Link to="/workrecord"><span><Icon type="exception" /><span>工作记录</span></span></Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default connect((state: any) => ({ changeMenu: state.changeMenu }))(Sidebar);
