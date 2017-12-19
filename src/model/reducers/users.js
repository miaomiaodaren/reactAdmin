import { handleActions } from 'redux-actions';   //用户模块state的管理

const sb = {
    name: 22,
    text: 'woshishabi'
}

export const todoList = handleActions({
    'ADD_TODO'(state, action) {
        console.info(state, 'woshistate', action.payload);
        return { ...state, loading: true, ...action.payload }
    },
}, sb)