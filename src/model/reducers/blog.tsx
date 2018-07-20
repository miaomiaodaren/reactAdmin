import { handleActions } from 'redux-actions';   //用户模块state的管理

const blogList = {count: 0}

export const saveBlogList = handleActions({
    'request blog list'(state: any, action: any) {
        return { ...state, loading: true }
    },
    'receive blog list'(state: any, action: any) {
        const { res } = action.payload;
        return { data: res.result.data, loading: false, count: res.result.count, page: res.result.page, pagesize: res.result.pagesize }
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