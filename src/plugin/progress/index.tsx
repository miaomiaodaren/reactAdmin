import * as React from 'react'
import Progress from './progress'

// const testDecorator = (target: Function) => {
//     const testMethod = () => 'successfully mixed testMethod into component';
//     target.prototype.testMethod = testMethod;
//     // 了解了connect 源码之后，如果在这里返回一个新的react.Component的话，会把原来的组件覆盖掉。
//     // class dectest extends React.Component<any, any> {
//     //     render() {
//     //         return (
//     //             <div>222222222222</div>
//     //         )
//     //     }
//     // }
//     // return dectest
// }

const testDecorator = (id: number) => {
    return (target: Function) => {
        target.prototype.testMethod = id;
    }
}

interface TestDecorated {
    testMethod: () => any;
}

@testDecorator(2)
export default class showInput extends React.Component<any, any> implements TestDecorated {
    constructor(props: any) {
        super(props)
        this.state = {
            name: 'ff'
        }
    }

    sayName = () => {
        console.info(this.state.name);
    }

    testMethod: any
    render() {
        console.info(this.testMethod, 3333, this);
        return (
            <div>
                {/* <Progress percent={80} />
                <br />
                <Progress type="circle" percent={80} /> */}
                111111
            </div>
        )
    }
}

class aa extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            age: '23'
        }
    }
    render() {
        return (
            <div>312312312312</div>
        )
    }
}
