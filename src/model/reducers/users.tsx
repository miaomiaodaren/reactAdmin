import { handleActions } from 'redux-actions';   //用户模块state的管理

const userStyle = {}
export const Users = (state = userStyle, action: any) => {
    switch(action.type) {
        case 'ADD_TODO':
            return { ...state, loading: true, ...action.payload }
        case 'request user start':
            return {...state, loading: true}
        case 'request user end':
            return {...state, loading: false}
        default:
            return state
    }
}

const addparams = {}

export const AddUser = handleActions({
    'request add user'(state: any, action: any) {
        return { loading: true }
    },
    'receive add user'(state: any, action: any) {
        const { res, req } = action.payload;
        return { data: req, loading: false }
    },
}, addparams)
