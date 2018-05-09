import { createAction } from 'redux-actions';
import { createAjaxAction } from '../../util/index';
import { GetUser, AddUser } from '../../api/api';

export interface ActionType {
    type: string;
    payload?: any;
}

// export const AddTodo = createAction('ADD_TODO');
// export const requestUserList = createAction('request user list');
// export const receiveUserList = createAction('receive user list');
// export const fetchUserList = createAjaxAction(GetUser, requestUserList, receiveUserList);

// 2018-5-8使用异步Action重构
export const AddTodo = (resInfo:any):ActionType => ({
    type: 'ADD_TODO',
    payload: resInfo,
})
export const AddTodoStart = ():ActionType => ({
    type: 'request user start'
})
export const AddTodoEnd = ():ActionType => ({
    type: 'request user end'
})
export const asyncAddTodo = (param?: any) => {
    return async(dispatch: any) => {
        try{
            dispatch(AddTodoStart());
            let result = await GetUser(param);
            dispatch(AddTodo(result));
            dispatch(AddTodoEnd());
        } catch(err) {
            console.error(err);
        }
    }
}



//用户添加
export const requestUserAdd = createAction('request user list');
export const receiveUserAdd = createAction('receive user list');
export const fetchUserAdd = createAjaxAction(AddUser, requestUserAdd, receiveUserAdd);