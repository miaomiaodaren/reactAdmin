import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;   //导航的子集菜单
import Login from '../../static/ff.jpg';  

@connect(
    (state) => ({
        changeMenu: state.changeMenu,
    })
)
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // collapsed: false,
            selectkey: window.location.hash.split('/')[1] || 'index'
        }
    }
    render() {
        const hasurl = window.location.hash.split('/')[1] || '';
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
                        <Menu.Item key="user/index">
                            <Link to="/user"><span><Icon type="user" /><span>用户管理</span></span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="blog" title={<span><Icon type="idcard" /><span>博客模块</span></span>}>
                        <Menu.Item key="blog/index">
                            <Link to="/blog"><span><span>博客列表</span></span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4">
                        <Link to="/books"><span><Icon type="exception" /><span>小说模块</span></span></Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/"><span><Icon type="shake" /><span>音乐模块</span></span></Link>
                    </Menu.Item>
                    <Menu.Item key="javalist">
                        <Link to="/javalist"><span><Icon type="smile" /><span>前端天堂</span></span></Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
