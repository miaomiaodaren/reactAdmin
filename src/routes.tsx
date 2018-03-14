import * as React from 'react';
import Home from './components/home/index';
import User from './components/users/index';

const routes = [
    {
        path: '/user',
        body: () => <User />
    },
    {
        path: '/',
        body: () => <Home />
    }, 
]

export default routes
