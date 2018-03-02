const sb = {
    text: '我是一个大傻逼',
}
export default function(state = sb, action) {
    console.info(state, action, 666);
    switch (action.type) {
        case 'CSSTT':
            return {
                ...state,
                ...action.payload,
                path: action.payload.type === "customer" ? "/goods" : "/allOrders"
            };
        default:
            break;
    }
    return state
}