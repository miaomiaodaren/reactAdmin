import { createAction } from 'redux-actions';


export function csstt() {
    return {type: 'CSSLIST'}
}

export function cssAttrAction(payload: string) {
    return { type: 'CSSATTR', payload };
}

export function testAction() {
    return {type: 'TEXTACTION'}
}

//异步active
// function asyncActionTest() {
//     return (dispatch: any) => {
//         return 1
//     }
// }