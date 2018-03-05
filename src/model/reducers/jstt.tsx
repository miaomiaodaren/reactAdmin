const sb = {
    text: '我是一个大傻逼',
}
export default function(state = sb, action: any) {
    console.info(action.type, 88);
    switch (action.type) {
        case 'CSSTT':
            return {
                ...state,
                ...action.payload,
            };
        default:
            break;
    }
    return state
}