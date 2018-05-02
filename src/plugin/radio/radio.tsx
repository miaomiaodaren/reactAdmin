import * as React from 'react';
import * as ProtType from 'prop-types';

export interface RadioProps {
    defaultChecked?: boolean,
    checked?: boolean,
    value?: any,
    checkedVal?: any,
    handChange?: any
}

export default class Radio extends React.Component<RadioProps, any> {
    static propTypes = {
        defaultChecked: ProtType.bool,          //默认是否选中
        checked: ProtType.bool,                 //当前是否选中
        value: ProtType.any,                    //根据值来判断是否选中
        handChange: ProtType.func
    };
    static defaultProps = {
        defaultChecked: false,
        checked: false
    }
    constructor(props: RadioProps) {
        super(props)
    }

    render() {
        const { defaultChecked, checked, value, checkedVal, handChange } = this.props
        return (
            <label>
                <label>
                    <input type="radio" checked={defaultChecked || checked || checkedVal === value } onChange={() => handChange(value)} />
                </label>
                {this.props.children}
            </label>
        )
    }
}