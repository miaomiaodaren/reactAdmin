import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Router } from 'react-router-dom';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;   //导航的子集菜单

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            selectkey: 'index'
        }
    }
    render() {
        const hasurl = window.location.hash.split('/')[1] || '';
        return (
            <div id="leftMenu">
                <Menu defaultSelectedKeys={[this.state.selectkey]} defaultOpenKeys={[hasurl]} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
                    <Menu.Item key="index">
                        <Link to="/"><span><Icon type="home" /><span>首页</span></span></Link>
                    </Menu.Item>
                    <SubMenu key="user" title={<span><Icon type="user" /><span>用户模块</span></span>}>
                        <Menu.Item key="user/index">
                            <Link to="/user"><span><Icon type="user" /><span>用户管理</span></span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="blog" title={<span><Icon type="blog" /><span>博客模块</span></span>}>
                        <Menu.Item key="blog/index">
                            <Link to="/blog"><span><Icon type="blog" /><span>博客列表</span></span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4">
                        <Link to="/"><span><Icon type="exception" /><span>小说模块</span></span></Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/"><span><Icon type="calculator" /><span>音乐模块</span></span></Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
