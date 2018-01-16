import { handleActions } from 'redux-actions';   //用户模块state的管理

const blogList = {}

export const saveBlogList = handleActions({
    'request blog list'(state, action) {
        return { ...state, loading: true }
    },
    'receive blog list'(state, action) {
        const { res } = action.payload
        return { data: res, loading: false }
    },
    'receive blog del'(state, action) {
        return { loading: false }
    }
}, blogList)

const typeList = {};

export const saveType = handleActions({
    'SAVETYPELIST'(state, active) {
        const { res } = active.payload;
        return { ...res }
    }
}, typeList) 