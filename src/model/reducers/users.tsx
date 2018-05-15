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

export const AddUser = (state = userStyle, action: any) => {
    switch(action.type) {
        case 'Add_User_Stare':
            return {...state, loading: true}
        case 'Add_User_End':
            return {...state, loading: false}
        case 'Add_Usering':
            return { ...state, ...action.payload, loading: true }
        default:
            return state
    }
}
