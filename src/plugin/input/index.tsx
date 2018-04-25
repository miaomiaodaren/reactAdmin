import * as React from 'react'

import Input from './input'


export default class showInput extends React.Component {
    constructor(props: any) {
        super(props)
    }

    handleChange = (v: string) => {
        console.info(v)
    }

    render() {
        return (
            <div>
                <Input placeholder="Basic usage" defaultValue='woshifufeng' />
                <br />
            </div>
        )
    }
}