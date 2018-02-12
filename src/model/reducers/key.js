import { handleActions } from 'redux-actions';   //用户模块state的管理

//左侧menu是否展开的状态
const menustate = {
    collapsed: false
}

export const changeMenu = handleActions({
    'change state'(state, action) {
        console.info(state, 99, action);
        return { ...state, ...action.payload }
    }
}, menustate)