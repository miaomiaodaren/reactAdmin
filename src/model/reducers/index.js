import { combineReducers } from 'redux';   //combineReducers是用来将多个render合并成一个最终的reducer;
import * as usersRender from './users.js';
import * as blogRender from './blog.js';
import * as keyRender from './key.js';

const reducers = combineReducers({
    ...usersRender,
    ...blogRender,
    ...keyRender
})

export default reducers