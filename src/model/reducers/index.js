import { combineReducers } from 'redux';   //combineReducers是用来将多个render合并成一个最终的reducer;
import * as usersRender from './users.js';
import * as blogRender from './blog.js';
import * as keyRender from './key.js';
import CssTtReducer from './jstt.js';

const reducers = combineReducers({
    ...usersRender,
    ...blogRender,
    ...keyRender,
    CSS: CssTtReducer
})

export default reducers