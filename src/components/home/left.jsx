import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;   //导航的子集菜单

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }
    render() {
        return (
            <div id="leftMenu">
                <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
                    <Menu.Item key="1">
                        <Link to="/"><span><Icon type="home" /><span>首页</span></span></Link>
                    </Menu.Item>
                    <SubMenu key="user" title={<span><Icon type="user" /><span>用户模块</span></span>}>
                        <Menu.Item key="user_1">
                            <Link to="/user"><span><Icon type="user" /><span>用户管理</span></span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3">
                        <Link to="/"><span><Icon type="book" /><span>博客模块</span></span></Link>
                    </Menu.Item>
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
