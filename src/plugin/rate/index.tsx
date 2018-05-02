import * as React from 'react'
import * as ProtType from 'prop-types'
import Rate from './rate'


export interface RateProps {
    count?: number
}

export interface RateState {
    counts?: number
}

export default class RateDemo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        
    }
    
    handleChange = (value: number): void => {
        console.info(value, 2222);
    }

    render() {
        return (
            <div>
                <Rate value={3} onChange={this.handleChange} allowHalf />
            </div>
        )
    }
} 