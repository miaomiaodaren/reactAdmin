import * as React from 'react'
import Progress from './progress'

const testDecorator = (target: Function) => {
    const testMethod = () => 'successfully mixed testMethod into component';
    target.prototype.testMethod = testMethod
}

interface TestDecorated {
    testMethod: () => any;
}

@testDecorator
export default class showInput extends React.Component<any, any> implements TestDecorated {
    constructor(props: any) {
        super(props)
    }

    testMethod: any

    render() {
        console.info(this.testMethod, 3333, this);
        return (
            <div>
                <Progress percent={80} />
                <br />
                <Progress type="circle" percent={80} />
            </div>
        )
    }
}