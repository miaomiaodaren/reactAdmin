import { combineReducers } from 'redux';   //combineReducers是用来将多个render合并成一个最终的reducer;
import * as usersRender from './users';
import * as blogRender from './blog';
import * as keyRender from './key';
import CssTtReducer from './jstt';

const reducers = combineReducers({
    ...usersRender,
    ...blogRender,
    ...keyRender,
    CssTtReducer
})

export default reducers