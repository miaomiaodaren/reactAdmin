
const csstts = {
    text: '我是一个大傻逼',
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
        default:
            break;
    }
    return state
}