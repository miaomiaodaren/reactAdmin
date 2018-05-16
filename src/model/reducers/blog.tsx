import { handleActions } from 'redux-actions';   //用户模块state的管理

const blogList = {}

export const saveBlogList = handleActions({
    'request blog list'(state: any, action: any) {
        return { ...state, loading: true }
    },
    'receive blog list'(state: any, action: any) {
        const { res } = action.payload;
        return { data: res.result.data, loading: false }
    },
    'receive blog del'(state: any, action: any) {
        return { loading: false }
    }
}, blogList)

const typeList = {};

export const saveType = handleActions({
    'SAVETYPELIST'(state: any, active: any) {
        const { res } = active.payload;
        return { ...res }
    }
}, typeList) 



export const getAllType = (state: any = typeList, action: any) => {
    switch(action.type) {
        case 'GETALLTYPELIST':
            return {...state, ...action}
        default: 
            return state;
    }
}