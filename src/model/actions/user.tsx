import { createAction } from 'redux-actions';
import { createAjaxAction } from '../../util/index.js';

import { GetUser, AddUser } from '../../api/api.js';

export const AddTodo = createAction('ADD_TODO');
export const requestUserList = createAction('request user list');
export const receiveUserList = createAction('receive user list');
export const fetchUserList = createAjaxAction(GetUser, requestUserList, receiveUserList);


//用户添加
export const requestUserAdd = createAction('request user list');
export const receiveUserAdd = createAction('receive user list');
export const fetchUserAdd = createAjaxAction(AddUser, requestUserAdd, receiveUserAdd);