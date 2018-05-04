import * as React from 'react'
import Progress from './progress'

export default class showInput extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <Progress percent={80} />
                <br />
                <Progress type="circle" percent={80} />
            </div>
        )
    }
}