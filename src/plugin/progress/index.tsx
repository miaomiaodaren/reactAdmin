import * as React from 'react'
import Progress from './progress'

export default class showInput extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <Progress />
                <br />
            </div>
        )
    }
}