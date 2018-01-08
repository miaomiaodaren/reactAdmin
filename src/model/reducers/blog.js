import { handleActions } from 'redux-actions';   //用户模块state的管理

const blogList = {}

export const saveBlogList = handleActions({
    'request blog list'(state, action) {
        return { ...state, loading: true }
    },
    'receive blog list'(state, action) {
        const { res } = action.payload
        return { data: res, loading: false }
    }
}, blogList)