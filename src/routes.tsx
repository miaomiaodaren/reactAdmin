import * as React from 'react';
import Home from './components/home/index';

const routes = [
    {
        path: '/',
        body: () => <Home />
    }
]

export default routes
