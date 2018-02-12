import { handleActions } from 'redux-actions';   //用户模块state的管理

const sb = {
    name: 22,
    text: 'woshishabi'
}

export const todoList = handleActions({
    'ADD_TODO'(state, action) {
        return { ...state, loading: true, ...action.payload }
    },
    'request user list'(state, action) {
        return { ...state, loading: true }
    },
    'receive user list'(state, action) {
        const { res } = action.payload
        return { data: res, loading: false }
    }
}, sb)

const addparams = {}

export const AddUser = handleActions({
    'request add user'(state, action) {
        return { loading: true }
    },
    'receive add user'(state, action) {
        const { res, req } = action.payload;
        return { data: req, loading: false }
    },
}, addparams)
