import * as React from 'react';
import Home from './components/home/index';
import User from './components/users/index';
import Blog from './components/blog/index';
import BlogEdit from './components/blog/blogedit';
import Books from './components/books/book';
import JavaList from './components/javalist/index';
import Lineage from './components/javalist/lineage';
import Music from './components/music/login';
import Login from './components/login';
import Main from './components/home/main'
import Plugin from './plugin/index';        //插件路由

const routes = [
    { path: '/user', body: () => User, name: '用户列表', sort: 2},
    { path: '/blog', body: () => Blog, name: '博客列表', sort: 3},
    { path: '/blogedit/:id', body: () => BlogEdit },
    { path: '/blogedit',body: () => BlogEdit },
    { path: '/books', body: () => Books },
    { path: '/javalist', body: () => JavaList },
    { path: '/lineage/:name', body: () => Lineage },
    { path: '/plugin', body: () => Plugin, name: '插件列表', sort: 4},
    { path: '/plugin/:type', body: () => Plugin },
    { path: '/music', body: () => Music },
    { path: '/', body: () => Main, name: '首页', sort: 1}
]

export default routes
