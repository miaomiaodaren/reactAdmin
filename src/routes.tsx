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
import Plugin from './plugin/index';        //插件路由

const routes = [
    // { path: '/login', body: () => Login },
    { path: '/user', body: () => User },
    { path: '/blog', body: () => Blog },
    { path: '/blogedit/:id', body: () => BlogEdit },
    { path: '/blogedit',body: () => BlogEdit },
    { path: '/books', body: () => Books },
    { path: '/javalist', body: () => JavaList },
    { path: '/lineage/:name', body: () => Lineage },
    { path: '/plugin', body: () => Plugin },
    { path: '/plugin/:type', body: () => Plugin },
    { path: '/music', body: () => Music },
    { path: '/', body: () => Home }
]

export default routes
