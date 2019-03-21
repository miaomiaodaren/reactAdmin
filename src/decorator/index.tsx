import * as api from '../api/api';
import * as React from 'react';

export interface Api {
    [index: number]: string;     //可以通过索引得到类型
}

// function conect(type: string) {
//     return function warring(Component: any) {
//         console.info(Component.prototype, 33333);
//         Component.prototype.age = '444444444444'
//     }
// }

function conect(type: string) {
    return function conect(WrappedComponent: any) {
        return class PP extends React.Component<any, any>{
            render() {
                return (
                    <WrappedComponent act={type} />
                )
            }
        }
    }
}

export {conect}