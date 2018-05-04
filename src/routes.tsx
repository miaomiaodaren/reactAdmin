import * as React from 'react';
import Home from './components/home/index';
import User from './components/users/index';
import Blog from './components/blog/index';
import BlogEdit from './components/blog/blogedit';
import Books from './components/books/book';
import JavaList from './components/javalist/index';
import Lineage from './components/javalist/lineage';
import Plugin from './plugin/index';        //插件路由

const routes = [
    {
        path: '/user',
        body: () => User
    },
    {
        path: '/blog',
        body: () => Blog
    },
    {
        path: '/blogedit/:id',
        body: () => BlogEdit
    },
    {
        path: '/books',
        body: () => Books
    },
    {
        path: '/javalist',
        body: () => JavaList
    },
    {
        path: '/lineage/:name',
        body: () => Lineage
    },
    {
        path: '/plugin',
        body: () => Plugin
    },
    {
        path: '/plugin/:type',
        body: () => Plugin
    },
    {
        path: '/',
        body: () => Home
    }
]

export default routes
