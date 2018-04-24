import * as React from 'react'

import Input from './input'
import Select from './select'

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
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Select defaultValue="lucy" style={{ width: 120 }} allowClear disabled>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </div>
        )
    }
}