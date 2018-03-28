import { createAction } from 'redux-actions';


export function csstt() {
    return {type: 'CSSLIST'}
}

export function cssAttrAction(payload: string) {
    return { type: 'CSSATTR', payload };
}