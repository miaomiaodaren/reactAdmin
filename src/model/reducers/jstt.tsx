export interface mainStateType {
    text: string,
    count: number,
    name: any[],
}

const csstts = {
    text: '我是一个大傻逼',
    count: 0,
    name: ['基础知识', '常用错误']
}
export default function(state = csstts, action: any) {
    switch (action.type) {
        case 'CSSLIST':
            return {
                ...state,
                cid: 12
            };
        case 'CSSATTR':
            const { res } = action.payload;
            return {
                ...state,
                userInfo: res.data
            }
        case 'TEXTACTION': 
            return {
                count: state.count + 1
            }
        case 'INFOLIST':
            return state
        default:
            break;
    }
    return  state
}

